import _ from 'lodash';

import addParentLink from '../utils/add-parent-link';
import addSelfLink from '../utils/add-self-link';

export const responseTransformer = baseUri => subaccount => _(subaccount)
    .thru(addParentLink(baseUri + '/v2/me/subaccounts'))
    .thru(addSelfLink(baseUri + '/v2/me/subaccounts'))
    .value();
