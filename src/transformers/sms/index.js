import _ from 'lodash'

import renameKey from '../../utils/rename-key'
import onlyForKeys from '../../utils/only-for-keys'
import addParentLink from '../../utils/add-parent-link'
import addSelfLink from '../../utils/add-self-link'
import { proxyForType } from '../../utils/proxyify-uri'
import unproxy from '../../utils/unproxyify-uri'

import collectImages from './collect-images'
import expandImages from './expand-images'

export const requestTransformer = baseUri => sms => _(sms)
  .mapValues(onlyForKeys(['delivery_report_uri'], proxyForType('sms_delivery_report')(baseUri)))
  .thru(renameKey('flash', 'flashsms'))
  .mapValues(onlyForKeys(['flashsms'], value => value ? 'yes' : 'no'))
  .thru(expandImages)
  .thru(renameKey('delivery_report_uri', 'whendelivered'))
  .value()

export const responseTransformer = baseUri => sms => _(sms)
  .thru(addParentLink(baseUri + '/v2/me/sms'))
  .thru(addSelfLink(baseUri + '/v2/me/sms'))
  .omit(['id'])
  .thru(renameKey('flashsms', 'flash'))
  .mapValues(onlyForKeys(['flash'], value => value === 'yes'))
  .thru(collectImages)
  .thru(renameKey('whendelivered', 'delivery_report_uri'))
  .mapValues(onlyForKeys(['delivery_report_uri'], unproxy(baseUri)))
  .value()
