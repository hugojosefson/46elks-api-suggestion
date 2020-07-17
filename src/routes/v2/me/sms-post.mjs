import proxyPostToCollection from '../../../utils/http/proxy-post-to-collection.mjs'

import {
  requestTransformer,
  responseTransformer,
} from '../../../transformers/sms/index.mjs'

export default proxyPostToCollection({
  uri: 'https://api.46elks.com/a1/SMS',
  requestTransformer,
  responseTransformer,
})
