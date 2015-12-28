import _ from 'lodash';

import renameKey from '../utils/rename-key';
import onlyForKey from '../utils/only-for-key';

export const back = call => _(call)
    .mapValues(onlyForKey('voice_start_action', JSON.stringify))
    .thru(renameKey('voice_start_uri', 'voice_start'))
    .thru(renameKey('voice_start_action', 'voice_start'))
    .thru(renameKey('voice_end_uri', 'whenhangup'))
    .value();

export default call => _(call)
    .omit(['id'])
    .value();
