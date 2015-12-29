import request from 'request-promise';
import _ from 'lodash';

import deletedCalls from '../../../../state/deleted-calls';
import fullUrl from '../../../../utils/full-url';
import transformCall from '../../../../transformers/call';
import handleRequestError from '../../../../utils/http/handle-request-error';

export default (req, res) => {
    if (deletedCalls.has(req.params.id)) {
        res.sendStatus(404);
    } else {
        request({
            uri: 'https://api.46elks.com/a1/Calls/' + encodeURIComponent(req.params.id),
            headers: _.pick(req.headers, 'authorization'),
            json: true
        }).then(result => {
            res.type('application/hal+json').send(_.assign({
                _links: {
                    _self: {href: fullUrl(req)}
                }
            }, transformCall(result)));
        }, handleRequestError(res));
    }
}
