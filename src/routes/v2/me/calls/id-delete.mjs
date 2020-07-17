import request from 'request-promise-native'
import _ from 'lodash'

import deletedCalls from '../../../../state/deleted-calls.mjs'
import handleRequestError from '../../../../utils/http/handle-request-error.mjs'

/**
 * Makes it look like the Call is DELETE'd in this API.
 */
export default (req, res) => {
  if (deletedCalls.has(req.params.id)) {
    res.sendStatus(404)
  } else {
    request({
      uri: 'https://api.46elks.com/a1/Calls/' + encodeURIComponent(req.params.id),
      headers: _.pick(req.headers, 'authorization'),
      json: true
    })
      .then(() => {
        deletedCalls.add(req.params.id)
        res.sendStatus(204)
      })
      .catch(handleRequestError(res))
  }
}
