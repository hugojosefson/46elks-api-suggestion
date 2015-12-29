import request from 'request-promise';
import _ from 'lodash';

import handleRequestError from '../../../../utils/http/handle-request-error';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers/' + encodeURIComponent(req.params.id),
        method: 'post',
        headers: _.pick(req.headers, 'authorization'),
        form: {
            active: 'no'
        }
    })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(handleRequestError(res));
};
