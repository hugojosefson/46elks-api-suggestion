import request from 'request-promise';
import _ from 'lodash';

import deletedSubaccounts from '../../../state/deleted-subaccounts';
import fullUrl from '../../../utils/full-url';
import handleRequestError from '../../../utils/http/handle-request-error';

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Subaccounts',
        headers: _.pick(req.headers, 'authorization'),
        json: true
    }).then(result => {
        const subaccounts = _(result.data)
            .filter(subaccount => !deletedSubaccounts.has(subaccount.id))
            .map(subaccount => _.assign({
                _links: {
                    _self: {href: fullUrl(req, encodeURIComponent(subaccount.id))}
                }
            }, subaccount))
            .value();

        const _links = {
            _self: {href: fullUrl(req)}
        };

        if (result.next) {
            _links.next = {href: fullUrl(req, '?start=' + encodeURIComponent(result.next))}
        }

        res.type('application/hal+json').send({
            _links,
            count: subaccounts.length,
            _embedded: {
                subaccounts
            }
        });
    }, handleRequestError(res));
}
