import proxyGetCollection from '../../../utils/http/proxy-get-collection'
import deletedCalls from '../../../state/deleted-calls'
import { responseTransformer } from '../../../transformers/call'

export default proxyGetCollection({
  uri: 'https://api.46elks.com/a1/Calls',
  filter: call => !deletedCalls.has(call.id),
  responseTransformer
})
