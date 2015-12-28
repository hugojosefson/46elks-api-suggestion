import _ from 'lodash';

import renameKey from '../../utils/rename-key';
import collectImages from './collect-images';
import expandImages from './expand-images';

export const back = sms => _(sms)
    .thru(renameKey('flash', 'flashsms'))
    .mapValues((value, key) => key === 'flashsms' ? (value ? 'yes' : 'no') : value)
    .thru(expandImages)
    .value();

export default sms => _(sms)
    .omit(['id'])
    .thru(renameKey('flashsms', 'flash'))
    .mapValues((value, key) => key === 'flash' ? (value === 'yes') : value)
    .thru(collectImages)
    .value();
