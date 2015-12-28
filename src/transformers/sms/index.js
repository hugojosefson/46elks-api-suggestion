import _ from 'lodash';

import renameKey from '../../utils/rename-key';
import onlyForKey from '../../utils/only-for-key';
import collectImages from './collect-images';
import expandImages from './expand-images';

export const back = sms => _(sms)
    .thru(renameKey('flash', 'flashsms'))
    .mapValues(onlyForKey('flashsms', value => value ? 'yes' : 'no'))
    .thru(expandImages)
    .value();

export default sms => _(sms)
    .omit(['id'])
    .thru(renameKey('flashsms', 'flash'))
    .mapValues(onlyForKey('flash', value => value === 'yes'))
    .thru(collectImages)
    .value();
