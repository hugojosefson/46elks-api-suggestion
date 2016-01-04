import request from 'request';

import baseUri from '../../../../utils/base-uri';
import {responseTransformer} from '../../../../transformers/sms';

export default (req, res) => {
    const {destination_uri} = req.query;
    console.log('req.body', req.body);
    const transformed = responseTransformer(baseUri(req))(req.body);
    console.log('responseTransformer(baseUri(req))(req.body)', transformed);
    request({
        uri: destination_uri,
        method: 'post',
        json: true,
        body: transformed
    }).pipe(res);
};
