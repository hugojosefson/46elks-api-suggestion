import request from 'request';

import baseUri from '../../../../utils/base-uri';
import {responseTransformer} from '../../../../transformers/sms';

export default (req, res) => {
    const {destination_uri} = req.query;
    const transformed = responseTransformer(baseUri(req))(req.body);
    request({
        uri: destination_uri,
        method: 'post',
        json: true,
        body: transformed
    }).pipe(res);
};
