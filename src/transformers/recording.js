import _ from 'lodash';

export const responseTransformer = baseUri => recording => _(recording)
    .thru(r => r.wav ? _.set(_.cloneDeep(r), '_links.wav.href', r.wav) : r)
    .thru(r => r.callid ? _.set(_.cloneDeep(r), '_links.call.href', baseUri + '/v2/me/calls/' + r.callid) : r)
    .omit(['callid', 'wav'])
    .value();
