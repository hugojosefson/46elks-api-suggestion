import _ from 'lodash';

import renameKey from '../utils/rename-key';
import onlyForKey from '../utils/only-for-key';

const isScalar = a => typeof a !== 'object';

const unproxy = (baseUri) => uri => uri.startsWith(`${baseUri}/v2/proxiedcallbacks/call-callback/`) ? decodeURIComponent(uri.substring((`${baseUri}/v2/proxiedcallbacks/call-callback/`).length)) : uri;
const proxy = (baseUri) => uri => `${baseUri}/v2/proxiedcallbacks/call-callback/${encodeURIComponent(uri)}`;

export const requestTransformer = baseUri => command => isScalar(command) ? command : _(command)
    .mapValues(onlyForKey('next', proxy(baseUri)))
    .mapValues(onlyForKey('record', proxy(baseUri)))
    .mapValues(onlyForKey('record_call', proxy(baseUri)))
    .thru(renameKey('caller_id', 'callerid'))
    .thru(renameKey('record_call', 'recordcall'))
    .mapValues(requestTransformer(baseUri))
    .value();

export const responseTransformer = baseUri => command => isScalar(command) ? command : _(command)
    .thru(renameKey('callerid', 'caller_id'))
    .thru(renameKey('recordcall', 'record_call'))
    .mapValues(responseTransformer(baseUri))
    .mapValues(onlyForKey('next', unproxy(baseUri)))
    .mapValues(onlyForKey('record', unproxy(baseUri)))
    .mapValues(onlyForKey('record_call', unproxy(baseUri)))
    .value();
