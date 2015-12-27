import express from 'express';
import version from 'routes/version';
import echo from 'routes/echo';
import v2 from 'routes/v2';
import v2Numbers from 'routes/v2/numbers';
import v2NumbersPost from 'routes/v2/numbers-post';
import v2NumbersId from 'routes/v2/numbers-id';
import v2NumbersIdDelete from 'routes/v2/numbers-id-delete';

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
app.post('/v2/numbers', v2NumbersPost);
app.get('/v2/numbers/:id', v2NumbersId);
app.delete('/v2/numbers/:id', v2NumbersIdDelete);

app.use('/echo', echo);

const port = process.env.PORT || 3001;
app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + port);
    }
});
