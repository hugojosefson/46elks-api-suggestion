import proxyPostToCollection from '../../../utils/http/proxy-post-to-collection.mjs'

import { requestTransformer, responseTransformer } from '../../../transformers/number.mjs'

export default proxyPostToCollection({
  uri: 'https://api.46elks.com/a1/Numbers',
  requestTransformer,
  responseTransformer
})
