export const proxyForType = type => baseUri => uri => `${baseUri}/v2/proxiedcallbacks/${type}/${encodeURIComponent(uri)}`;

export default proxyForType('call-callback');
