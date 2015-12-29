import proxyPatchItem from '../../../../utils/http/proxy-patch-item';

import {default as responseTransformer} from '../../../../transformers/number';
import {back as requestTransformer} from '../../../../transformers/number';

export default proxyPatchItem({
    collectionUri: 'https://api.46elks.com/a1/Numbers',
    requestTransformer,
    responseTransformer
});
