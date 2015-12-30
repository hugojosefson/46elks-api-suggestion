import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import baseUri from '../base-uri';
import handleRequestError from './handle-request-error';

const patchItem = ({
    collectionUri,
    requestTransformer = () => _.identity,
    responseTransformer = () => _.identity
    }) => (req, res) => {
    request({
        uri: collectionUri + '/' + encodeURIComponent(req.params.id),
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: requestTransformer(baseUri(req))(req.body)
    })
        .then(resultString => {
            const result = JSON.parse(resultString);
            const itemUri = baseUri(req) + req.originalUrl;
            res
                .type('application/hal+json')
                .send(_.assign({
                    _links: {
                        _self: {href: itemUri}
                    }
                }, responseTransformer(baseUri(req))(result)));
        })
        .catch(handleRequestError(res));
};

export default (...args) => compose([
    bodyParser.json(),
    patchItem(...args)
]);
