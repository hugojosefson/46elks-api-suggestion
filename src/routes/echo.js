import _ from 'lodash';

export default (req, res) => res.send({
    headers: req.headers,
    body: req.body,
    req: _(req).pick([
        'hostname',
        'protocol',
        'port',
        'originalUrl',
        'url',
        'baseUrl',
        'query'
    ]).value()
});
