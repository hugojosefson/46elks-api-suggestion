import proxyGetCollection from '../../../utils/http/proxy-get-collection';
import {responseTransformer} from '../../../transformers/number';

export default proxyGetCollection({
    uri: 'https://api.46elks.com/a1/Numbers',
    filter: number => number.active === 'yes',
    responseTransformer
});
