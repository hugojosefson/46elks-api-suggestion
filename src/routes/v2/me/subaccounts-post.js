import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import fullUrl from '../../../utils/full-url';

const createSubaccount = (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Subaccounts',
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: req.body
    }).then(resultString => {
        const result = JSON.parse(resultString);
        console.log(result);
        const uri = fullUrl(req, result.id);
        res
            .type('application/hal+json')
            .header('Location', uri)
            .send(_.assign({
                _links: {
                    _self: {href: uri}
                }
            }, result));
    }, error => {
        console.error(error);
        const body = error && error.response && error.response.body;
        if (body && (body.startsWith('Missing key') || /^Key .*? missing$/.test(body))) {
            res.status(400).type('text').send(body);
        } else {
            const statusCode = error && error.response && error.response.statusCode || 500;
            if (body) {
                res.status(statusCode).send(body);
            } else {
                res.sendStatus(statusCode);
            }
        }
    });
};

export default compose([
    bodyParser.json(),
    createSubaccount
]);
