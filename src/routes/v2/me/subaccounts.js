import proxyGetCollection from '../../../utils/http/proxy-get-collection';
import {responseTransformer} from '../../../transformers/subaccount';
import deletedSubaccounts from '../../../state/deleted-subaccounts';

export default proxyGetCollection({
    uri: 'https://api.46elks.com/a1/Subaccounts',
    filter: subaccount => !deletedSubaccounts.has(subaccount.id),
    responseTransformer
});
