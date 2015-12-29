import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import fullUrl from '../../../../utils/full-url';

const patchSubaccount = (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Subaccounts/' + encodeURIComponent(req.params.id),
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: req.body
    }).then(resultString => {
        const result = JSON.parse(resultString);
        const uri = fullUrl(req);
        res
            .type('application/hal+json')
            .send(_.assign({
                _links: {
                    _self: {href: uri}
                }
            }, result));
    }, error => {
        const body = error && error.response && error.response.body;
        const statusCode = error && error.response && error.response.statusCode || 500;
        if (body) {
            res.status(statusCode).send(body);
        } else {
            res.sendStatus(statusCode);
        }
    })
};

export default compose([
    bodyParser.json(),
    patchSubaccount
]);
