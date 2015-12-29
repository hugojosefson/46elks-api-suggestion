import request from 'request-promise';
import _ from 'lodash';

import deletedSmses from '../../../../state/deleted-smses';
import handleRequestError from '../../../../utils/http/handle-request-error';

/**
 * Makes it look like the SMS is DELETE'd in this API.
 */
export default (req, res) => {
    if (deletedSmses.has(req.params.id)) {
        res.sendStatus(404);
    } else {
        request({
            uri: 'https://api.46elks.com/a1/SMS/' + encodeURIComponent(req.params.id),
            headers: _.pick(req.headers, 'authorization'),
            json: true
        })
            .then(() => {
                deletedSmses.add(req.params.id);
                res.sendStatus(204);
            })
            .catch(handleRequestError(res));
    }
};
