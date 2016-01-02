import express from 'express';
import allowMethods from 'allow-methods';

import health from './routes/health';
import version from './routes/version';
import echo from './routes/echo';
import v2 from './routes/v2';
import v2Me from './routes/v2/me';
import v2MeNumbers from './routes/v2/me/numbers';
import v2MeNumbersPost from './routes/v2/me/numbers-post';
import v2MeNumbersId from './routes/v2/me/numbers/id';
import v2MeNumbersIdDelete from './routes/v2/me/numbers/id-delete';
import v2MeNumbersIdPatch from './routes/v2/me/numbers/id-patch';
import v2MeSubaccounts from './routes/v2/me/subaccounts';
import v2MeSubaccountsPost from './routes/v2/me/subaccounts-post';
import v2MeSubaccountsId from './routes/v2/me/subaccounts/id';
import v2MeSubaccountsIdDelete from './routes/v2/me/subaccounts/id-delete';
import v2MeSubaccountsIdPatch from './routes/v2/me/subaccounts/id-patch';
import v2MeSms from './routes/v2/me/sms';
import v2MeSmsPost from './routes/v2/me/sms-post';
import v2MeSmsId from './routes/v2/me/sms/id';
import v2MeSmsIdDelete from './routes/v2/me/sms/id-delete';
import v2MeCalls from './routes/v2/me/calls';
import v2MeCallsPost from './routes/v2/me/calls-post';
import v2MeCallsId from './routes/v2/me/calls/id';
import v2MeCallsIdDelete from './routes/v2/me/calls/id-delete';
import v2Proxiedcallback from './routes/v2/proxiedcallback';

const app = express();
app.set('json spaces', 2);
app.set('trust proxy', true);
app.set('strict routing', true);
app.enable('strict routing');
app.set('case sensitive routing', true);

app.use('/health', allowMethods(['options', 'get']));
app.get('/health', health);

app.use('*/echo', allowMethods(['options', 'get', 'post', 'patch']));
app.use('*/echo/*', allowMethods(['options', 'get', 'post', 'patch']));
app.use('*/echo', echo);
app.use('*/echo/*', echo);

app.use('/version', allowMethods(['options', 'get']));
app.get('/version', version);

app.use('/v2/me/numbers/:id', allowMethods(['options', 'get', 'delete', 'patch']));
app.get('/v2/me/numbers/:id', v2MeNumbersId);
app.delete('/v2/me/numbers/:id', v2MeNumbersIdDelete);
app.patch('/v2/me/numbers/:id', v2MeNumbersIdPatch);

app.use('/v2/me/numbers', allowMethods(['options', 'get', 'post']));
app.get('/v2/me/numbers', v2MeNumbers);
app.post('/v2/me/numbers', v2MeNumbersPost);

app.use('/v2/me/subaccounts/:id', allowMethods(['options', 'get', 'delete', 'patch']));
app.get('/v2/me/subaccounts/:id', v2MeSubaccountsId);
app.delete('/v2/me/subaccounts/:id', v2MeSubaccountsIdDelete);
app.patch('/v2/me/subaccounts/:id', v2MeSubaccountsIdPatch);

app.use('/v2/me/subaccounts', allowMethods(['options', 'get', 'post']));
app.get('/v2/me/subaccounts', v2MeSubaccounts);
app.post('/v2/me/subaccounts', v2MeSubaccountsPost);

app.use('/v2/me/sms/:id', allowMethods(['options', 'get', 'delete']));
app.get('/v2/me/sms/:id', v2MeSmsId);
app.delete('/v2/me/sms/:id', v2MeSmsIdDelete);

app.use('/v2/me/sms', allowMethods(['options', 'get', 'post']));
app.get('/v2/me/sms', v2MeSms);
app.post('/v2/me/sms', v2MeSmsPost);

app.use('/v2/me/calls/:id', allowMethods(['options', 'get', 'delete']));
app.get('/v2/me/calls/:id', v2MeCallsId);
app.delete('/v2/me/calls/:id', v2MeCallsIdDelete);

app.use('/v2/me/calls', allowMethods(['options', 'get', 'post']));
app.get('/v2/me/calls', v2MeCalls);
app.post('/v2/me/calls', v2MeCallsPost);

app.use('/v2/me', allowMethods(['options', 'get']));
app.get('/v2/me', v2Me);

app.use('/v2/proxiedcallback', allowMethods(['options', 'post']));
app.post('/v2/proxiedcallback', v2Proxiedcallback);

app.use('/v2', allowMethods(['options', 'get']));
app.get('/v2', v2);

app.use('/', allowMethods(['options', 'get']));
app.get('/', (req, res) => res.redirect(302, 'v2'));

const port = process.env.PORT || 3001; //eslint-disable-line no-process-env
app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + port);
    }
});
