import request from 'request';

import baseUri from '../../../../utils/base-uri';
import {responseTransformer} from '../../../../transformers/voice-action-callback';

export default (req, res) => {
    const {destination_uri} = req.query;
    request({
        uri: destination_uri,
        method: 'post',
        json: true,
        body: responseTransformer(baseUri(req))(req.body)
    }).pipe(res);
};
