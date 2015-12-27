import request from 'request-promise';
import _ from 'lodash';

import fullUrl from 'utils/full-url';
import transformNumber from 'transformers/number';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers',
        headers: _.omit(req.headers, ['cookie', 'host']),
        json: true
    }).then(result => {
        const numbers = _(result.data)
            .filter(number => number.active === 'yes')
            .map(number => _.assign({
                _links: {
                    _self: {href: fullUrl(req, encodeURIComponent(number.id))}
                }
            }, number))
            .map(transformNumber)
            .value();

        res.type('application/hal+json').send({
            _links: {
                _self: {href: fullUrl(req)}
            },
            count: numbers.length,
            total: numbers.length,
            _embedded: {
                numbers
            }
        });
    })
}
