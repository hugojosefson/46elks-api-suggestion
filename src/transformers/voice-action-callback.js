import _ from 'lodash'

export const responseTransformer = baseUri => entity => _(entity)
  .thru(e => e.wav ? _.set(_.cloneDeep(e), '_links.wav.href', e.wav) : e)
  .thru(e => e.callid ? _.set(_.cloneDeep(e), '_links.call.href', baseUri + '/v2/me/calls/' + e.callid) : e)
  .omit(['callid', 'wav'])
  .value()
