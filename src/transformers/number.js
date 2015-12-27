import _ from 'lodash';
import renameKey from 'utils/rename-key';

export default fullUrl => number => _(number)
    .omit(['active', 'id'])
    .thru(renameKey('voice_start', 'voice_uri'))
    .thru(renameKey('sms_url', 'sms_uri'))
    .thru(renameKey('mms_url', 'mms_uri'))
    .thru(number => _.assign({
        _links: {
            _self: fullUrl(encodeURIComponent(number.number))
        }
    }, number))
    .value();
