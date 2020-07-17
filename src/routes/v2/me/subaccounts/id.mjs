import request from 'request-promise-native'
import _ from 'lodash'

import deletedSubaccounts from '../../../../state/deleted-subaccounts.mjs'
import baseUri from '../../../../utils/base-uri.mjs'
import { responseTransformer } from '../../../../transformers/subaccount.mjs'
import handleRequestError from '../../../../utils/http/handle-request-error.mjs'

export default (req, res) => {
  if (deletedSubaccounts.has(req.params.id)) {
    res.sendStatus(404)
  } else {
    request({
      uri:
        'https://api.46elks.com/a1/Subaccounts/' +
        encodeURIComponent(req.params.id),
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
}
