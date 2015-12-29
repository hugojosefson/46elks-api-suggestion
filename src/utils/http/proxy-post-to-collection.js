import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import fullUrl from '../full-url';
import handleRequestError from './handle-request-error';

const postToCollection = ({
    uri,
    requestTransformer = _.identity,
    responseTransformer = _.identity
    }) => (req, res) => {
    request({
        uri,
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: requestTransformer(req.body)
    })
        .then(resultString => {
            const result = JSON.parse(resultString);
            const itemUri = fullUrl(req, result.id);
            res
                .type('application/hal+json')
                .header('Location', itemUri)
                .send(_.assign({
                    _links: {
                        _self: {href: itemUri}
                    }
                }, responseTransformer(result)));
        })
        .catch(handleRequestError(res));
};

export default (...args) => compose([
    bodyParser.json(),
    postToCollection(...args)
]);
