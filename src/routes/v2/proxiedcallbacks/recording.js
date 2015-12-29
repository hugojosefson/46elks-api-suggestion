import request from 'request';

import baseUri from '../../../utils/base-uri';
import {responseTransformer} from '../../../transformers/recording';

export default (req, res) => {
    const {destinationUri} = req.params;
    request({
        uri: destinationUri,
        method: 'post',
        json: true,
        body: responseTransformer(baseUri(req))(req.body)
    }).pipe(res);
};
