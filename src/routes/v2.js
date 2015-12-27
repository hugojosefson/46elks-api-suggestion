import fullUrl from '../utils/full-url';

export default (req, res) => res.type('application/hal+json').send({
    _links: {
        _self: {href: fullUrl(req)},
        numbers: {href: fullUrl(req, 'numbers')},
        sms: {href: fullUrl(req, 'sms')},
        calls: {href: fullUrl(req, 'calls')}
    }
});
