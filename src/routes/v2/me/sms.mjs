import proxyGetCollection from '../../../utils/http/proxy-get-collection.mjs'
import deletedSmses from '../../../state/deleted-smses.mjs'
import { responseTransformer } from '../../../transformers/sms/index.mjs'

export default proxyGetCollection({
  uri: 'https://api.46elks.com/a1/SMS',
  filter: sms => !deletedSmses.has(sms.id),
  responseTransformer,
})
