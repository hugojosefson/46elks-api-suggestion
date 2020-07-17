import request from 'request'

import baseUri from '../../../../utils/base-uri.mjs'
import { responseTransformer } from '../../../../transformers/voice-action-callback.mjs'

export default (req, res) => {
  // eslint-disable-next-line camelcase
  const { destination_uri } = req.query
  request({
    uri: destination_uri,
    method: 'post',
    json: true,
    body: responseTransformer(baseUri(req))(req.body),
  }).pipe(res)
}
