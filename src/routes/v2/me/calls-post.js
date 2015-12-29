import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import {default as transformCall, back as transformCallBack} from '../../../transformers/call';
import fullUrl from '../../../utils/full-url';
import handleRequestError from '../../../utils/http/handle-request-error';

const startCall = (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Calls',
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: transformCallBack(req.body)
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
            }, transformCall(result)));
    }, handleRequestError(res));
};

export default compose([
    bodyParser.json(),
    startCall
]);
