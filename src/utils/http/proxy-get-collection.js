import request from 'request-promise';
import _ from 'lodash';

import baseUri from '../base-uri';
import handleRequestError from './handle-request-error';

const lastPathSegment = () => /\/([^/]+)\/?$/;

export default ({
    uri,
    name = uri.match(lastPathSegment())[1].toLowerCase(),
    filter = () => true,
    responseTransformer = () => _.identity
    }) => (req, res) => {
    request({
        uri,
        headers: _.pick(req.headers, 'authorization'),
        qs: {
            start: req.query.start
        },
        json: true
    })
        .then(result => {
            const items = _(result.data)
                .filter(filter)
                .map(responseTransformer(baseUri(req)))
                .value();

            const _links = {
                parent: {href: baseUri(req) + '/v2/me'},
                self: {href: baseUri(req) + req.originalUrl} // includes any query params
            };

            if (result.next) {
                _links.next = {href: baseUri(req) + `/v2/me/${name}?start=` + encodeURIComponent(result.next)};
            }

            res.type('application/hal+json').send({
                _links,
                count: items.length,
                _embedded: {
                    [name]: items
                }
            });
        })
        .catch(handleRequestError(res));
};
