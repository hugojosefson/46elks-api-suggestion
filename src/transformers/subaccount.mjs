import _ from 'lodash'

import addParentLink from '../utils/add-parent-link.mjs'
import addSelfLink from '../utils/add-self-link.mjs'
import renameKey from '../utils/rename-key.mjs'

export const requestTransformer = baseUri => subaccount =>
  _(subaccount)
    .thru(renameKey('usage_limit', 'usagelimit'))
    .thru(renameKey('balanace_used', 'balanaceused'))
    .value()

export const responseTransformer = baseUri => subaccount =>
  _(subaccount)
    .thru(addParentLink(baseUri + '/v2/me/subaccounts'))
    .thru(addSelfLink(baseUri + '/v2/me/subaccounts'))
    .thru(renameKey('usagelimit', 'usage_limit'))
    .thru(renameKey('balanaceused', 'balanace_used'))
    .value()
