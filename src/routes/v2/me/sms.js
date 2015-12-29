import request from 'request-promise';
import _ from 'lodash';

import deletedSmses from '../../../state/deleted-smses';
import fullUrl from '../../../utils/full-url';
import transformSms from '../../../transformers/sms';
import handleRequestError from '../../../utils/http/handle-request-error';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/SMS',
        headers: _.pick(req.headers, 'authorization'),
        qs: {
            start: req.query.start
        },
        json: true
    }).then(result => {
        const smses = _(result.data)
            .filter(sms => !deletedSmses.has(sms.id))
            .map(sms => _.assign({
                _links: {
                    _self: {href: fullUrl(req, encodeURIComponent(sms.id))}
                }
            }, sms))
            .map(transformSms)
            .value();

        const _links = {
            _self: {href: fullUrl(req)}
        };

        if (result.next) {
            _links.next = {href: fullUrl(req, '?start=' + encodeURIComponent(result.next))}
        }

        res.type('application/hal+json').send({
            _links,
            count: smses.length,
            _embedded: {
                smses
            }
        });
    }, handleRequestError(res));
};
