import express from 'express';
import version from 'routes/version';
import v2 from 'routes/v2';

const app = express();
app.set('json spaces', 2);
app.set('trust proxy', true);

app.get('/version', version);
app.get('/', (req, res) => res.redirect(302, 'v2'));
app.use('/v2', v2);
app.use('/echo', (req, res) => res.send({headers: req.headers, body: req.body}));

const port = process.env.PORT || 3001;
app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + port);
    }
});
