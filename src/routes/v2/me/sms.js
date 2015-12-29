import proxyGetCollection from '../../../utils/http/proxy-get-collection';
import deletedSmses from '../../../state/deleted-smses';
import {responseTransformer} from '../../../transformers/sms';

export default proxyGetCollection({
    uri: 'https://api.46elks.com/a1/SMS',
    filter: sms => !deletedSmses.has(sms.id),
    responseTransformer
});
