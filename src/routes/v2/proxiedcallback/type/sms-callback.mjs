import request from 'request-promise-native'

import baseUri from '../../../../utils/base-uri.mjs'
import handleRequestError from '../../../../utils/http/handle-request-error.mjs'

import { responseTransformer } from '../../../../transformers/sms/index.mjs'

export default (req, res) => {
  // eslint-disable-next-line camelcase
  const { destination_uri } = req.query
  console.log('req.body', req.body)
  const transformed = responseTransformer(baseUri(req))(req.body)
  console.log('responseTransformer(baseUri(req))(req.body)', transformed)
  request({
    uri: destination_uri,
    method: 'post',
    json: true,
    body: transformed,
  })
    .then(response => res.status(200).send(response))
    .catch(handleRequestError)
}
