import proxyPostToCollection from '../../../utils/http/proxy-post-to-collection';

import {default as responseTransformer} from '../../../transformers/number';
import {back as requestTransformer} from '../../../transformers/number';

export default proxyPostToCollection({
    uri: 'https://api.46elks.com/a1/Numbers',
    requestTransformer,
    responseTransformer
});
