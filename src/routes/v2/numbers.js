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
        result.data = _(result.data)
            .filter(number => number.active === 'yes')
            .map(number => _.assign({
                _links: {
                    _self: fullUrl(req, encodeURIComponent(number.id))
                }
            }, number))
            .map(transformNumber)
            .value();

        res.type('application/hal+json').send(_.assign({
            _links: {
                _self: fullUrl(req)
            }
        }, result));
    })
}
