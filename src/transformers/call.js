import _ from 'lodash';

import renameKey from '../utils/rename-key';
import onlyForKey from '../utils/only-for-key';
import addSelfLink from '../utils/add-self-link';

export const requestTransformer = call => _(call)
    .mapValues(onlyForKey('voice_start_action', JSON.stringify))
    .thru(renameKey('voice_start_uri', 'voice_start'))
    .thru(renameKey('voice_start_action', 'voice_start'))
    .thru(renameKey('voice_end_uri', 'whenhangup'))
    .value();

export const responseTransformer = baseUri => call => _(call)
    .thru(addSelfLink(baseUri + '/v2/me/calls'))
    .omit(['id'])
    .value();
