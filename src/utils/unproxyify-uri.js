export const unproxyForType = type => baseUri => uri => {
    const proxyPrefix = `${baseUri}/v2/proxiedcallbacks/${type}/`;

    if (uri.startsWith(proxyPrefix)) {
        const destinationUri = uri.substring(proxyPrefix.length);
        return decodeURIComponent(destinationUri);
    } else {
        return uri;
    }
};

export default unproxyForType('call-callback');
