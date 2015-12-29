import request from 'request-promise';
import _ from 'lodash';

import fullUrl from '../../../../utils/full-url';
import transformNumber from '../../../../transformers/number';
import handleRequestError from '../../../../utils/http/handle-request-error';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers/' + encodeURIComponent(req.params.id),
        headers: _.pick(req.headers, 'authorization'),
        json: true
    }).then(result => {
        res.type('application/hal+json').send(_.assign({
            _links: {
                _self: {href: fullUrl(req)}
            }
        }, transformNumber(result)));
    }, handleRequestError(res));
}
