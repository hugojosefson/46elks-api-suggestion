import request from 'request-promise';
import _ from 'lodash';
import fullUrl from 'full-url';

const renameKey = (fromKey, toKey) => object => _.omit(_.assign({}, object, {[toKey]: object[fromKey]}), fromKey);

export default (req, res) => {
    request({
        uri: 'https://api.46elks.com/a1/Numbers',
        headers: _.omit(req.headers, ['cookie', 'host']),
        json: true
    }).then(result => {
        result.data = _(result.data)
            .filter(number => number.active === 'yes')
            .map(number => _.omit(number, ['active', 'id']))
            .map(renameKey('voice_start', 'voice_uri'))
            .map(renameKey('sms_url', 'sms_uri'))
            .map(renameKey('mms_url', 'mms_uri'))
            .map(number => _.assign({
                _links: {
                    _self: fullUrl(req, encodeURIComponent(number.number))
                }
            }, number))
            .value();
        res.type('application/hal+json').send(_.assign({
            _links: {
                _self: fullUrl(req)
            }
        }, result));
    })
}
