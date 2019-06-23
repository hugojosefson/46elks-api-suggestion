import proxyPostToCollection from '../../../utils/http/proxy-post-to-collection'

import { requestTransformer, responseTransformer } from '../../../transformers/sms'

export default proxyPostToCollection({
  uri: 'https://api.46elks.com/a1/SMS',
  requestTransformer,
  responseTransformer
})
