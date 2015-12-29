import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import {default as transformNumber, back as transformNumberBack} from '../../../transformers/number';
import fullUrl from '../../../utils/full-url';
import handleRequestError from '../../../utils/http/handle-request-error';

const allocateNumber = (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers',
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: transformNumberBack(req.body)
    }).then(resultString => {
        const result = JSON.parse(resultString);
        const uri = fullUrl(req, result.id);
        res
            .type('application/hal+json')
            .header('Location', uri)
            .send(_.assign({
                _links: {
                    _self: {href: uri}
                }
            }, transformNumber(result)));
    }, handleRequestError(res));
};

export default compose([
    bodyParser.json(),
    allocateNumber
]);
