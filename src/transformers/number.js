import _ from 'lodash';

import renameKey from '../utils/rename-key';
import onlyForKeys from '../utils/only-for-keys';
import addSelfLink from '../utils/add-self-link';
import proxy from '../utils/proxyify-uri';
import unproxy from '../utils/unproxyify-uri';

export const requestTransformer = baseUri => number => _(number)
    .mapValues(onlyForKeys(['voice_start_uri', 'sms_uri', 'mms_uri'], proxy(baseUri)))
    .mapValues(onlyForKeys(['voice_start_action'], JSON.stringify))
    .thru(renameKey('sms_uri', 'sms_url'))
    .thru(renameKey('mms_uri', 'mms_url'))
    .thru(renameKey('voice_start_uri', 'voice_start'))
    .thru(renameKey('voice_start_action', 'voice_start'))
    .value();

export const responseTransformer = baseUri => number => _(number)
    .thru(addSelfLink(baseUri + '/v2/me/numbers'))
    .map((value, key) => {
        if (key === 'voice_start') {
            try {
                return ['voice_start_action', JSON.parse(value)];
            } catch (ignored) {
                return ['voice_start_uri', value];
            }
        } else {
            return [key, value];
        }
    })
    .object()
    .thru(renameKey('sms_url', 'sms_uri'))
    .thru(renameKey('mms_url', 'mms_uri'))
    .mapValues(onlyForKeys(['voice_start_uri', 'sms_uri', 'mms_uri'], unproxy(baseUri)))
    .omit(['active', 'id'])
    .value();
