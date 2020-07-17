import proxyPostToCollection from '../../../utils/http/proxy-post-to-collection.mjs'

import { requestTransformer, responseTransformer } from '../../../transformers/call.mjs'

export default proxyPostToCollection({
  uri: 'https://api.46elks.com/a1/Calls',
  requestTransformer,
  responseTransformer
})
