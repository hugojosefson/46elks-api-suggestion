import request from 'request-promise';

import baseUri from '../../../../utils/base-uri';
import handleRequestError from '../../../../utils/http/handle-request-error';

import {responseTransformer} from '../../../../transformers/call';
import {requestTransformer} from '../../../../transformers/voice-action';

export default (req, res) => {
    const {destination_uri} = req.query;
    request({
        uri: destination_uri,
        method: 'post',
        json: true,
        body: responseTransformer(baseUri(req))(req.body)
    })
        .then(response => res.send(requestTransformer(baseUri(req))(response)))
        .catch(handleRequestError);
};
