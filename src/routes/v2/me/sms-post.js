import proxyPostToCollection from '../../../utils/http/proxy-post-to-collection';

import {default as responseTransformer} from '../../../transformers/sms';
import {back as requestTransformer} from '../../../transformers/sms';

export default proxyPostToCollection({
    uri: 'https://api.46elks.com/a1/SMS',
    requestTransformer,
    responseTransformer
});
