import express from 'express';
import auth from 'basic-auth';
import _ from 'lodash';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.port || 3001;
app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + port);
    }
});
