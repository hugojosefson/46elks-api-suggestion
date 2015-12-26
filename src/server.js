import express from 'express';

const app = express();

const port = process.env.PORT || 3001;
app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + port);
    }
});
