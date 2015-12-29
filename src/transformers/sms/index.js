import _ from 'lodash';

import renameKey from '../../utils/rename-key';
import onlyForKey from '../../utils/only-for-key';
import addSelfLink from '../../utils/add-self-link';

import collectImages from './collect-images';
import expandImages from './expand-images';

export const requestTransformer = sms => _(sms)
    .thru(renameKey('flash', 'flashsms'))
    .mapValues(onlyForKey('flashsms', value => value ? 'yes' : 'no'))
    .thru(expandImages)
    .thru(renameKey('delivery_report_uri', 'whendelivered'))
    .value();

export const responseTransformer = baseUri => sms => _(sms)
    .thru(addSelfLink(baseUri + '/v2/me/sms'))
    .omit(['id'])
    .thru(renameKey('flashsms', 'flash'))
    .mapValues(onlyForKey('flash', value => value === 'yes'))
    .thru(collectImages)
    .thru(renameKey('whendelivered', 'delivery_report_uri'))
    .value();
