import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import fullUrl from '../../../../utils/full-url';
import {default as transformNumber, back as transformNumberBack} from '../../../../transformers/number';
import handleRequestError from '../../../../utils/http/handle-request-error';

const patchNumber = (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers/' + encodeURIComponent(req.params.id),
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: transformNumberBack(req.body)
    }).then(resultString => {
        const result = JSON.parse(resultString);
        const uri = fullUrl(req);
        res
            .type('application/hal+json')
            .send(_.assign({
                _links: {
                    _self: {href: uri}
                }
            }, transformNumber(result)));
    }, handleRequestError(res))
};

export default compose([
    bodyParser.json(),
    patchNumber
]);
