import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import fullUrl from '../../../../utils/full-url';
import {default as transformNumber, back as transformNumberBack} from '../../../../transformers/number';

const patchNumber = (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers/' + encodeURIComponent(req.params.id),
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: transformNumberBack(req.body)
    }).then(resultString => {
        const result = JSON.parse(resultString);
        console.log(result);
        const uri = fullUrl(req);
        res
            .type('application/hal+json')
            .send(_.assign({
                _links: {
                    _self: {href: uri}
                }
            }, transformNumber(result)));
    }, error => {
        console.error(error);
        const body = error && error.response && error.response.body;
        if (body === 'Invalid number id') {
            res.sendStatus(404);
        } else {
            const statusCode = error && error.response && error.response.statusCode || 500;
            if (body) {
                res.status(statusCode).send(body);
            } else {
                res.sendStatus(statusCode);
            }
        }
    })
};

export default compose([
    bodyParser.json(),
    patchNumber
]);
