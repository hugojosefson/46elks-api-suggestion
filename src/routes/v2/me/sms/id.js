import request from 'request-promise';
import _ from 'lodash';

import deletedSmses from '../../../../state/deleted-smses';
import fullUrl from '../../../../utils/full-url';
import transformSms from '../../../../transformers/sms';

export default (req, res) => {
    if (deletedSmses.has(req.params.id)) {
        res.sendStatus(404);
    } else {
        request({
            uri: 'https://api.46elks.com/a1/SMS/' + encodeURIComponent(req.params.id),
            headers: _.pick(req.headers, 'authorization'),
            json: true
        }).then(result => {
            res.type('application/hal+json').send(_.assign({
                _links: {
                    _self: {href: fullUrl(req)}
                }
            }, transformSms(result)));
        }, error => {
            const body = error && error.response && error.response.body;
            const statusCode = error && error.response && error.response.statusCode || 500;
            if (body) {
                res.status(statusCode).send(body);
            } else {
                res.sendStatus(statusCode);
            }
        });
    }
}
