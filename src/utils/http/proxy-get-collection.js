import request from 'request-promise';
import _ from 'lodash';

import fullUrl from '../full-url';
import handleRequestError from './handle-request-error';

const lastPathSegment = () => /\/([^/]+)\/?$/;

export default ({
    uri,
    name = uri.match(lastPathSegment())[1].toLowerCase(),
    filter = () => true,
    responseTransformer = _.identity
    }) => (req, res) => {
    request({
        uri,
        headers: _.pick(req.headers, 'authorization'),
        qs: {
            start: req.query.start
        },
        json: true
    }).then(result => {
        const items = _(result.data)
            .filter(filter)
            .map(sms => _.assign({
                _links: {
                    _self: {href: fullUrl(req, encodeURIComponent(sms.id))}
                }
            }, sms))
            .map(responseTransformer)
            .value();

        const _links = {
            _self: {href: fullUrl(req)}
        };

        if (result.next) {
            _links.next = {href: fullUrl(req, '?start=' + encodeURIComponent(result.next))}
        }

        res.type('application/hal+json').send({
            _links,
            count: items.length,
            _embedded: {
                [name]: items
            }
        });
    }, handleRequestError(res));
};
