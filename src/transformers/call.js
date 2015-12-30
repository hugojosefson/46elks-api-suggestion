import _ from 'lodash';

import renameKey from '../utils/rename-key';
import onlyForKey from '../utils/only-for-key';
import onlyForKeys from '../utils/only-for-keys';
import addSelfLink from '../utils/add-self-link';
import proxy from '../utils/proxyify-uri';
import unproxy from '../utils/unproxyify-uri';

export const requestTransformer = baseUri => call => _(call)
    .mapValues(onlyForKeys(['voice_start_uri', 'sms_uri', 'mms_uri'], proxy(baseUri)))
    .mapValues(onlyForKey('voice_start_action', JSON.stringify))
    .thru(renameKey('voice_start_uri', 'voice_start'))
    .thru(renameKey('voice_start_action', 'voice_start'))
    .thru(renameKey('voice_end_uri', 'whenhangup'))
    .value();

export const responseTransformer = baseUri => call => _(call)
    .thru(addSelfLink(baseUri + '/v2/me/calls'))
    .omit(['id'])
    .value();
