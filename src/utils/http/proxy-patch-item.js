import request from 'request-promise';
import _ from 'lodash';
import {compose} from 'compose-middleware';
import bodyParser from 'body-parser';

import fullUrl from '../full-url';
import handleRequestError from './handle-request-error';

const patchItem = ({
    collectionUri,
    requestTransformer = _.identity,
    responseTransformer = _.identity
    }) => (req, res) => {
    request({
        uri: collectionUri + '/' + encodeURIComponent(req.params.id),
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: requestTransformer(req.body)
    })
        .then(resultString => {
            const result = JSON.parse(resultString);
            const uri = fullUrl(req);
            res
                .type('application/hal+json')
                .send(_.assign({
                    _links: {
                        _self: {href: uri}
                    }
                }, responseTransformer(result)));
        })
        .catch(handleRequestError(res));
};

export default (...args) => compose([
    bodyParser.json(),
    patchItem(...args)
]);
