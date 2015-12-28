import request from 'request-promise';
import _ from 'lodash';

import fullUrl from '../../utils/full-url';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Me',
        headers: _.pick(req.headers, 'authorization'),
        json: true
    }).then(result => {
        res.type('application/hal+json').send(_.assign({
            _links: {
                _self: {href: fullUrl(req)},
                numbers: {href: fullUrl(req, 'numbers')},
                sms: {href: fullUrl(req, 'sms')},
                calls: {href: fullUrl(req, 'calls')}
            }
        }, result));
    })
}
