import request from 'request-promise';
import _ from 'lodash';

import deletedSubaccounts from '../../../../state/deleted-subaccounts';
import baseUri from '../../../../utils/base-uri';
import handleRequestError from '../../../../utils/http/handle-request-error';

export default (req, res) => {
    if (deletedSubaccounts.has(req.params.id)) {
        res.sendStatus(404);
    } else {
        request({
            uri: 'https://api.46elks.com/a1/Subaccounts/' + encodeURIComponent(req.params.id),
            headers: _.pick(req.headers, 'authorization'),
            json: true
        }).then(result => {
            res.type('application/hal+json').send(_.assign({
                _links: {
                    _self: {href: baseUri(req) + '/v2/me/subaccounts/' + encodeURIComponent(req.params.id)}
                }
            }, result));
        }, handleRequestError(res));
    }
};
