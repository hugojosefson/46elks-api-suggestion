import Url from 'url';
import _ from 'lodash';

export default baseUri => uri => {
    const expected = _.pick(Url.parse(`${baseUri}/v2/proxiedcallback`), ['protocol', 'host', 'pathname']);
    const parsedUri = Url.parse(uri, true);

    if (_.matches(expected)(parsedUri)) {
        return parsedUri.query.destination_uri;
    } else {
        return uri;
    }
};
