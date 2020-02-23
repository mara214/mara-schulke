import 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';

//SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

import { registerLinkResolver } from 'gatsby-source-prismic-graphql';
import { link } from 'utils/prismic/config';

registerLinkResolver(link);
