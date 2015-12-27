import {Router} from 'express';
import fullUrl from 'full-url';
import numbers from './numbers';

export default Router()
    .get('/', (req, res) => res.send({
        _links: {
            _self: fullUrl(req) + 'v2',
            numbers: fullUrl(req) + 'v2/numbers',
            sms: fullUrl(req) + 'v2/sms',
            calls: fullUrl(req) + 'v2/calls'
        }
    }))
    .get('/numbers', numbers)
