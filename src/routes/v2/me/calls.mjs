import proxyGetCollection from '../../../utils/http/proxy-get-collection.mjs'
import deletedCalls from '../../../state/deleted-calls.mjs'
import { responseTransformer } from '../../../transformers/call.mjs'

export default proxyGetCollection({
  uri: 'https://api.46elks.com/a1/Calls',
  filter: call => !deletedCalls.has(call.id),
  responseTransformer,
})
