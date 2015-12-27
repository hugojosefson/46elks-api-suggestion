import express from 'express';
import version from 'routes/version';
import v2 from 'routes/v2';

const app = express();
app.set('json spaces', 2);

app.get('/version', version);
app.get('/', (req, res) => res.redirect(302, 'v2'));
app.use('/v2', v2);

const port = process.env.PORT || 3001;
app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + port);
    }
});
