import request from 'request-promise';
import _ from 'lodash';

import fullUrl from '../../../utils/full-url';
import transformNumber from '../../../transformers/number';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers/' + encodeURIComponent(req.params.id),
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: {
            active: 'no'
        }
    }).then(() => {
        res.sendStatus(204);
    }, error => {
        const body = error && error.response && error.response.body;
        if (body === 'Invalid number id') {
            res.sendStatus(404);
        } else {
            const statusCode = error && error.response && error.response.statusCode || 500;
            if (body) {
                res.status(statusCode).send(body);
            } else {
                res.sendStatus(statusCode);
            }
        }
    })
}
