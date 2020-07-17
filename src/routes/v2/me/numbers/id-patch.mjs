import proxyPatchItem from '../../../../utils/http/proxy-patch-item.mjs'

import { requestTransformer, responseTransformer } from '../../../../transformers/number.mjs'

export default proxyPatchItem({
  collectionUri: 'https://api.46elks.com/a1/Numbers',
  requestTransformer,
  responseTransformer
})
