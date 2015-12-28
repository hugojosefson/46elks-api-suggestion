import fullUrl from '../utils/full-url';

export default (req, res) => res.type('application/hal+json').send({
    _links: {
        _self: {href: fullUrl(req)},
        me: {href: fullUrl(req, 'me')}
    }
});
