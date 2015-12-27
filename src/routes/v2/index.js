import fullUrl from 'full-url';

export default (req, res) => res.type('application/hal+json').send({
    _links: {
        _self: fullUrl(req),
        numbers: fullUrl(req, 'numbers'),
        sms: fullUrl(req, 'sms'),
        calls: fullUrl(req, 'calls')
    }
});
