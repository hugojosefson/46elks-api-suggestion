import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import {default as transformNumber, back as transformNumberBack} from 'transformers/number';
import fullUrl from 'utils/full-url';
import renameKey from 'utils/rename-key';

const allocateNumber = (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers',
        method: 'post',
        headers: _.omit(req.headers, ['cookie', 'host']),
        form: transformNumberBack(req.body),
        json: true
    }).then(result => {
        const uri = fullUrl(req, result.id);
        res
            .type('application/hal+json')
            .header('Location', uri)
            .send(_.assign({
                _links: {
                    _self: {href: uri}
                }
            }, transformNumber(result)));
    })
};

export default compose([
    bodyParser.json(),
    allocateNumber
]);
