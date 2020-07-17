import _ from 'lodash'

import addLink from '../utils/add-link.mjs'
import renameKey from '../utils/rename-key.mjs'

export const responseTransformer = baseUri => me => _(me)
  .thru(addLink('parent')(baseUri + '/v2'))
  .thru(addLink('self')(baseUri + '/v2/me'))
  .thru(addLink('numbers')(baseUri + '/v2/me/numbers'))
  .thru(addLink('sms')(baseUri + '/v2/me/sms'))
  .thru(addLink('calls')(baseUri + '/v2/me/calls'))
  .thru(addLink('subaccounts')(baseUri + '/v2/me/subaccounts'))
  .thru(renameKey('mobilenumber', 'mobile_number'))
  .thru(renameKey('displayname', 'display_name'))
  .thru(renameKey('costtype', 'cost_type'))
  .thru(renameKey('trialactivated', 'trial_activated'))
  .value()
