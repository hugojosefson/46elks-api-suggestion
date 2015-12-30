export default baseUri => uri => {
    const proxyPrefix = `${baseUri}/v2/proxiedcallbacks/call-callback/`;

    if (uri.startsWith(proxyPrefix)) {
        const destinationUri = uri.substring(proxyPrefix.length);
        return decodeURIComponent(destinationUri);
    } else {
        return uri;
    }
};
