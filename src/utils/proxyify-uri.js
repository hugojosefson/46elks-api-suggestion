export default baseUri => uri => `${baseUri}/v2/proxiedcallbacks/call-callback/${encodeURIComponent(uri)}`;
