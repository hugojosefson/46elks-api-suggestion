import request from 'request-promise';
import _ from 'lodash';

import deletedSubaccounts from '../../../../state/deleted-subaccounts';
import handleRequestError from '../../../../utils/http/handle-request-error';

/**
 * Sets usagelimit to 0, and makes it look like the Subaccount is DELETE'd in this API.
 */
export default (req, res) => {
    if (deletedSubaccounts.has(req.params.id)) {
        res.sendStatus(404);
    } else {
        request({
            uri: 'https://api.46elks.com/a1/Subaccounts/' + encodeURIComponent(req.params.id),
            method: 'post',
            headers: _.pick(req.headers, 'authorization'),
            form: {usagelimit: 0}
        })
            .then(() => {
                deletedSubaccounts.add(req.params.id);
                res.sendStatus(204);
            })
            .catch(handleRequestError(res));
    }
};
