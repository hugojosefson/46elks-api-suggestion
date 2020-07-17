import request from 'request-promise-native'

import baseUri from '../../../../utils/base-uri.mjs'
import handleRequestError from '../../../../utils/http/handle-request-error.mjs'

import { responseTransformer } from '../../../../transformers/call.mjs'
import { requestTransformer } from '../../../../transformers/voice-action.mjs'

export default (req, res) => {
  // eslint-disable-next-line camelcase
  const { destination_uri } = req.query
  request({
    uri: destination_uri,
    method: 'post',
    json: true,
    body: responseTransformer(baseUri(req))(req.body),
  })
    .then(response => res.send(requestTransformer(baseUri(req))(response)))
    .catch(handleRequestError)
}
