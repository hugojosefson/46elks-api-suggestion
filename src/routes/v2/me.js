import request from 'request-promise';
import _ from 'lodash';

import baseUri from '../../utils/base-uri';
import handleRequestError from '../../utils/http/handle-request-error';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Me',
        headers: _.pick(req.headers, 'authorization'),
        json: true
    }).then(result => {
        res.type('application/hal+json').send(_.assign({
            _links: {
                _self: {href: baseUri(req) + '/v2/me'},
                numbers: {href: baseUri(req) + '/v2/me/numbers'},
                sms: {href: baseUri(req) + '/v2/me/sms'},
                calls: {href: baseUri(req) + '/v2/me/calls'}
            }
        }, result));
    }, handleRequestError(res));
};
