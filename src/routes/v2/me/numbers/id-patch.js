import proxyPatchItem from '../../../../utils/http/proxy-patch-item';

import {requestTransformer, responseTransformer} from '../../../../transformers/number';

export default proxyPatchItem({
    collectionUri: 'https://api.46elks.com/a1/Numbers',
    requestTransformer,
    responseTransformer
});
