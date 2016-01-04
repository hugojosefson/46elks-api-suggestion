import _ from 'lodash';

import addParentLink from '../utils/add-parent-link';
import addSelfLink from '../utils/add-self-link';
import renameKey from '../utils/rename-key';

export const requestTransformer = baseUri => subaccount => _(subaccount)
    .thru(renameKey('usage_limit', 'usagelimit'))
    .value();

export const responseTransformer = baseUri => subaccount => _(subaccount)
    .thru(addParentLink(baseUri + '/v2/me/subaccounts'))
    .thru(addSelfLink(baseUri + '/v2/me/subaccounts'))
    .thru(renameKey('usagelimit', 'usage_limit'))
    .value();
