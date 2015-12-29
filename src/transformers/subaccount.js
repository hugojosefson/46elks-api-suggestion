import _ from 'lodash';

import addSelfLink from '../utils/add-self-link';

export const responseTransformer = baseUri => subaccount => _(subaccount)
    .thru(addSelfLink(baseUri + '/v2/me/subaccounts'))
    .value();
