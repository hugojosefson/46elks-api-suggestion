import _ from 'lodash';

function path(first, second, ...rest) {
    if (typeof second === 'undefined') {
        return first;
    } else {
        if (rest.length === 0) {
            return [_.trimRight(first, '/'), _.trimLeft(second, '/')].join('/');
        } else {
            return path(path(first, second), ...rest);
        }
    }
}

export default (req, suffix) => `${req.protocol}://${req.headers.host}${path(req.originalUrl, suffix)}`;
