import _ from 'lodash';

import renameKey from '../../utils/rename-key';
import onlyForKeys from '../../utils/only-for-keys';
import addSelfLink from '../../utils/add-self-link';
import {proxyForType} from '../../utils/proxyify-uri';
import {unproxyForType} from '../../utils/unproxyify-uri';

import collectImages from './collect-images';
import expandImages from './expand-images';

export const requestTransformer = baseUri => sms => _(sms)
    .mapValues(onlyForKeys(['delivery_report_uri'], proxyForType('sms-delivery-report')(baseUri)))
    .thru(renameKey('flash', 'flashsms'))
    .mapValues(onlyForKeys(['flashsms'], value => value ? 'yes' : 'no'))
    .thru(expandImages)
    .thru(renameKey('delivery_report_uri', 'whendelivered'))
    .value();

export const responseTransformer = baseUri => sms => _(sms)
    .thru(addSelfLink(baseUri + '/v2/me/sms'))
    .omit(['id'])
    .thru(renameKey('flashsms', 'flash'))
    .mapValues(onlyForKeys(['flash'], value => value === 'yes'))
    .thru(collectImages)
    .thru(renameKey('whendelivered', 'delivery_report_uri'))
    .mapValues(onlyForKeys(['delivery_report_uri'], unproxyForType('sms-delivery-report')(baseUri)))
    .value();
