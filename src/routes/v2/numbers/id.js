import request from 'request-promise';
import _ from 'lodash';

import fullUrl from '../../../utils/full-url';
import transformNumber from '../../../transformers/number';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers/' + encodeURIComponent(req.params.id),
        headers: _.omit(req.headers, ['cookie', 'host']),
        json: true
    }).then(result => {
        res.type('application/hal+json').send(_.assign({
            _links: {
                _self: {href: fullUrl(req)}
            }
        }, transformNumber(result)));
    })
}
