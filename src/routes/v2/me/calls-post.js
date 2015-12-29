import proxyPostToCollection from '../../../utils/http/proxy-post-to-collection';

import {requestTransformer, responseTransformer} from '../../../transformers/call';

export default proxyPostToCollection({
    uri: 'https://api.46elks.com/a1/Calls',
    requestTransformer,
    responseTransformer
});
