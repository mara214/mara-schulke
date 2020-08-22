const fs = require(`fs`);
const kebabCase = require(`lodash.kebabcase`);
const mkdirp = require(`mkdirp`);
const path = require(`path`);
const { siteMetadata } = require('./gatsby-config');

const CONTENT_PATH = path.join(__dirname, 'content');
const ARTICLE_PATH = path.join(CONTENT_PATH, 'articles');
const PAGE_PATH = path.join(CONTENT_PATH, 'pages');

// Ensure that content directories exist at site-level
// If non-existent they'll be created here (as empty folders)
exports.onPreBootstrap = ({ reporter }) => {
	const dirs = [ARTICLE_PATH, PAGE_PATH];

	dirs.forEach(dir => {
		if (!fs.existsSync(dir)) {
			reporter.info(`Initializing "${dir}" directory`);
			mkdirp.sync(dir);
		}
	});
};

const mdxResolverPassthrough = fieldName => async (source, args, context, info) => {
	const type = info.schema.getType(`Mdx`);
	const mdxNode = context.nodeModel.getNodeById({
		id: source.parent,
	});
	const resolver = type.getFields()[fieldName].resolve;
	const result = await resolver(mdxNode, args, context, {
		fieldName,
	});
	return result;
};

// Create general interfaces that you could can use to leverage other data sources
// The core theme sets up MDX as a type for the general interface
exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes, createFieldExtension } = actions;

	const slugify = source => {
		const slug = source.slug ? source.slug : kebabCase(source.title);

		return `/${slug}`.replace(/\/\/+/g, `/`);
	};

	createFieldExtension({
		name: `slugify`,
		extend() {
			return {
				resolve: slugify,
			};
		},
	});

	createFieldExtension({
		name: `mdxpassthrough`,
		args: {
			fieldName: `String!`,
		},
		extend({ fieldName }) {
			return {
				resolve: mdxResolverPassthrough(fieldName),
			};
		},
	});

	createTypes(`
		interface Article @nodeInterface {
			id: ID!
			slug: String! @slugify
			title: String!
			category: ArticleCategory!
			published: Date! @dateformat
			modified: Date @dateformat
			featured: Boolean
			excerpt(pruneLength: Int = 160): String!
			body: String!
			html: String
			timeToRead: Int
			tags: [ArticleTag]
			banner: File @fileByRelativePath
			description: String
		}
		
		type ArticleCategory {
			name: String!
			slug: String!
			color: String!
		}
		
		type ArticleTag {
			name: String!
			slug: String!
		}
			
		interface Page @nodeInterface {
			id: ID!
			slug: String!
			title: String!
			navigatable: Boolean
			excerpt(pruneLength: Int = 160): String!
			body: String!
		}

		type MdxArticle implements Node & Article {
			slug: String! @slugify
			title: String!
			published: Date! @dateformat
			modified: Date @dateformat
			category: ArticleCategory!
			featured: Boolean
			excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
			body: String! @mdxpassthrough(fieldName: "body")
			html: String! @mdxpassthrough(fieldName: "html")
			timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
			tags: [ArticleTag]
			banner: File @fileByRelativePath
			description: String
		}
			
		type MdxPage implements Node & Page {
			slug: String!
			title: String!
			navigatable: Boolean
			excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
			body: String! @mdxpassthrough(fieldName: "body")
		}
			
		type ExternalLink {
			name: String!
			url: String!
		}
			
		type NavigationEntry {
			title: String!
			slug: String!
		}
	`);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
	const { createNode, createParentChildLink } = actions;

	// Make sure that it's an MDX node
	if (node.internal.type !== `Mdx`) {
		return;
	}

	// Create a source field
	// And grab the sourceInstanceName to differentiate the different sources
	// In this case "ARTICLE_PATH" and "PAGES_PATH"
	const fileNode = getNode(node.parent);

	const source = fileNode.sourceInstanceName;

	if (node.internal.type !== 'Mdx') return;

	// Check for "articles" and create the "Article" type
	if (source === 'articles') {
		const category = siteMetadata.categories.find(category => {
			return category.name.toLowerCase() === node.frontmatter.category.toLowerCase();
		});

		if (!category) {
			console.error(`An article (${node.frontmatter.title}) has an invalid category (${node.frontmatter.category}). Check for typos in the frontmatter or add the category in the gatsby-config.js!`);
			return;
		}

		const fieldData = {
			slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
			title: node.frontmatter.title,
			published: node.frontmatter.published,
			modified: node.frontmatter.modified,
			category,
			featured: node.frontmatter.featured,
			banner: node.frontmatter.banner,
			description: node.frontmatter.description,
			tags: node.frontmatter.tags ? node.frontmatter.tags.map((tag) => ({
				name: tag,
				slug: kebabCase(tag),
			})) : null
		};

		const mdxArticleId = createNodeId(`${node.id} >>> MdxArticle`);

		createNode({
			...fieldData,
			// Required fields
			id: mdxArticleId,
			parent: node.id,
			children: [],
			internal: {
				type: `MdxArticle`,
				contentDigest: createContentDigest(fieldData),
				content: JSON.stringify(fieldData),
				description: `Mdx implementation of the Article interface`,
			},
		});

		createParentChildLink({ parent: node, child: getNode(mdxArticleId) });
	}

	// Check for "pages" and create the "Page" type
	if (source === 'pages') {
		const fieldData = {
			title,
			slug,
			navigatable,
		} = node.frontmatter;

		const mdxPageId = createNodeId(`${node.id} >>> MdxPage`);

		createNode({
			...fieldData,
			// Required fields
			id: mdxPageId,
			parent: node.id,
			children: [],
			internal: {
				type: `MdxPage`,
				contentDigest: createContentDigest(fieldData),
				content: JSON.stringify(fieldData),
				description: `Mdx implementation of the Page interface`,
			},
		});

		createParentChildLink({ parent: node, child: getNode(mdxPageId) });
	}
};

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions

	const result = await graphql(`
		{
			site {
				siteMetadata {
					categories {
						slug
					}
				}
			}

			articles: allArticle(sort: { fields: published, order: DESC }) {
				nodes {
					slug
				}
			}

			pages: allPage {
				nodes {
					slug
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild(`There was an error loading your posts or pages`, result.errors)
		return
	}

	const { categories } = result.data.site.siteMetadata;

	categories.map((category) =>
		createPage({
			path: category.slug,
			component: require.resolve(`./src/templates/category.tsx`),
			context: {
				slug: category.slug,
			},
		})
	);

	const articles = result.data.articles.nodes

	articles.map((article) =>
		createPage({
			path: article.slug,
			component: require.resolve(`./src/templates/article.tsx`),
			context: {
				slug: article.slug,
			},
		})
	);

	const pages = result.data.pages.nodes

	if (pages.length > 0) {
		pages.map((page) =>
			createPage({
				path: page.slug,
				component: require.resolve(`./src/templates/page.tsx`),
				context: {
					slug: page.slug,
				},
			})
		);
	}
}
