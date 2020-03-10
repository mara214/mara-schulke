import 'utils/prism';

import { registerLinkResolver } from 'gatsby-source-prismic-graphql';
import { link } from 'utils/prismic/config';

registerLinkResolver(link);
