import express from 'express';
import version from 'routes/version';
import echo from 'routes/echo';
import v2 from 'routes/v2';
import v2Numbers from 'routes/v2/numbers';
import v2NumbersId from 'routes/v2/numbers-id';

const app = express();
app.set('json spaces', 2);
app.set('trust proxy', true);
app.set('strict routing', true);
app.enable('strict routing');
app.set('case sensitive routing', true);

app.get('/version', version);
app.get('/', (req, res) => res.redirect(302, 'v2'));
app.get('/v2', v2);
app.get('/v2/numbers', v2Numbers);
app.get('/v2/numbers/:id', v2NumbersId);

app.use('/echo', echo);

const port = process.env.PORT || 3001;
app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + port);
    }
});
