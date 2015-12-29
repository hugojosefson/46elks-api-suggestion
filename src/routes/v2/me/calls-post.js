import proxyPostToCollection from '../../../utils/http/proxy-post-to-collection';

import {default as responseTransformer} from '../../../transformers/call';
import {back as requestTransformer} from '../../../transformers/call';

export default proxyPostToCollection({
    uri: 'https://api.46elks.com/a1/Calls',
    requestTransformer,
    responseTransformer
});
