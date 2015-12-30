import _ from 'lodash';

import renameKey from '../utils/rename-key';
import onlyForKeys from '../utils/only-for-keys';
import proxy from '../utils/proxyify-uri';
import unproxy from '../utils/unproxyify-uri';

const isPrimitive = a => typeof a !== 'object';

export const requestTransformer = baseUri => command => isPrimitive(command) ? command : _(command)
    .thru(renameKey('caller_id', 'callerid'))
    .thru(renameKey('record_call', 'recordcall'))
    .mapValues(requestTransformer(baseUri))
    .mapValues(onlyForKeys(['busy', 'success', 'failed', 'next', 'record', 'recordcall'], proxy(baseUri)))
    .value();

export const responseTransformer = baseUri => command => isPrimitive(command) ? command : _(command)
    .thru(renameKey('callerid', 'caller_id'))
    .thru(renameKey('recordcall', 'record_call'))
    .mapValues(responseTransformer(baseUri))
    .mapValues(onlyForKeys(['busy', 'success', 'failed', 'next', 'record', 'record_call'], unproxy(baseUri)))
    .value();
