import _ from 'lodash';

import renameKey from '../utils/rename-key';

export const back = number => _(number)
    .thru(renameKey('sms_uri', 'sms_url'))
    .thru(renameKey('mms_uri', 'mms_url'))
    .thru(renameKey('voice_uri', 'voice_start'))
    .value();

export default number => _(number)
    .thru(renameKey('voice_start', 'voice_uri'))
    .thru(renameKey('sms_url', 'sms_uri'))
    .thru(renameKey('mms_url', 'mms_uri'))
    .omit(['active', 'id'])
    .value();
