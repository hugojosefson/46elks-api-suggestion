import request from 'request-promise-native'
import _ from 'lodash'

import baseUri from '../../../../utils/base-uri.mjs'
import { responseTransformer } from '../../../../transformers/number.mjs'
import handleRequestError from '../../../../utils/http/handle-request-error.mjs'

export default (req, res) => {
  request({
    uri:
      'https://api.46elks.com/a1/Numbers/' + encodeURIComponent(req.params.id),
    headers: _.pick(req.headers, 'authorization'),
    json: true,
  })
    .then(result => {
      res
        .type('application/hal+json')
        .send(responseTransformer(baseUri(req))(result))
    })
    .catch(handleRequestError(res))
}
