import request from 'request-promise';
import _ from 'lodash';

import deletedCalls from '../../../state/deleted-calls';
import fullUrl from '../../../utils/full-url';
import transformCall from '../../../transformers/call';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Calls',
        headers: _.pick(req.headers, 'authorization'),
        qs: {
            start: req.query.start
        },
        json: true
    }).then(result => {
        const calls = _(result.data)
            .filter(call => !deletedCalls.has(call.id))
            .map(call => _.assign({
                _links: {
                    _self: {href: fullUrl(req, encodeURIComponent(call.id))}
                }
            }, call))
            .map(transformCall)
            .value();

        const _links = {
            _self: {href: fullUrl(req)}
        };

        if (result.next) {
            _links.next = {href: fullUrl(req, '?start=' + encodeURIComponent(result.next))}
        }

        res.type('application/hal+json').send({
            _links,
            count: calls.length,
            _embedded: {
                calls
            }
        });
    })
}
