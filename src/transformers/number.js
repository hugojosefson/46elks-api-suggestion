import _ from 'lodash';
import renameKey from 'utils/rename-key';

export default number => _(number)
    .thru(renameKey('voice_start', 'voice_uri'))
    .thru(renameKey('sms_url', 'sms_uri'))
    .thru(renameKey('mms_url', 'mms_uri'))
    .omit(['active', 'id'])
    .value();
