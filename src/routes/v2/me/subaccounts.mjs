import proxyGetCollection from '../../../utils/http/proxy-get-collection.mjs'
import { responseTransformer } from '../../../transformers/subaccount.mjs'
import deletedSubaccounts from '../../../state/deleted-subaccounts.mjs'

export default proxyGetCollection({
  uri: 'https://api.46elks.com/a1/Subaccounts',
  filter: subaccount => !deletedSubaccounts.has(subaccount.id),
  responseTransformer,
})
