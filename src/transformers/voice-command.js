import _ from 'lodash';

import renameKey from '../utils/rename-key';
import onlyForKey from '../utils/only-for-key';

const isScalar = a => typeof a !== 'object';

const unproxy = (baseUri, type) => uri => uri.startsWith(`${baseUri}/v2/proxiedcallbacks/${type}/`) ? decodeURIComponent(uri.substring((`${baseUri}/v2/proxiedcallbacks/${type}/`).length)) : uri;
const proxy = (baseUri, type) => uri => `${baseUri}/v2/proxiedcallbacks/${type}/${encodeURIComponent(uri)}`;

export const requestTransformer = baseUri => command => isScalar(command) ? command : _(command)
    .mapValues(onlyForKey('record', proxy(baseUri, 'recording')))
    .mapValues(onlyForKey('record_call', proxy(baseUri, 'recording')))
    .thru(renameKey('caller_id', 'callerid'))
    .thru(renameKey('record_call', 'recordcall'))
    .mapValues(requestTransformer(baseUri))
    .value();

export const responseTransformer = baseUri => command => isScalar(command) ? command : _(command)
    .thru(renameKey('callerid', 'caller_id'))
    .thru(renameKey('recordcall', 'record_call'))
    .mapValues(responseTransformer(baseUri))
    .mapValues(onlyForKey('record', unproxy(baseUri, 'recording')))
    .mapValues(onlyForKey('record_call', unproxy(baseUri, 'recording')))
    .value();
