import request from 'request-promise';
import _ from 'lodash';

import baseUri from '../../utils/base-uri';
import {responseTransformer} from '../../transformers/me';
import handleRequestError from '../../utils/http/handle-request-error';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Me',
        headers: _.pick(req.headers, 'authorization'),
        json: true
    }).then(result => {
        res.type('application/hal+json').send(responseTransformer(baseUri(req))(result));
    }, handleRequestError(res));
};
