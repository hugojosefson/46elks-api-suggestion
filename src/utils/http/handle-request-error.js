export default res => error => {
    const body = error && error.response && error.response.body;
    if (body === 'Invalid number id') {
        res.sendStatus(404);
    } else if (body === 'Missing key voice_start') {
        res.status(400).type('text').send('Missing key voice_start_uri or voice_start_action');
    } else if (body && (body.startsWith('Invalid from number') || body.startsWith('Invalid to number'))) {
        res.status(400).type('text').send(body);
    } else if (body && (body.startsWith('Missing key') || /^Key .*? missing$/.test(body))) {
        res.status(400).type('text').send(body);
    } else if (body && (body.startsWith('Not enough credits'))) {
        res.status(402).type('text').send(body);
    } else if (body && (body.startsWith('Too long '))) {
        res.status(400).type('text').send(body);
    } else {
        const statusCode = error && error.response && error.response.statusCode || 500;
        const headers = error && error.response.headers || {};
        res.set(headers);
        if (body) {
            res.status(statusCode).send(body);
        } else {
            res.sendStatus(statusCode);
        }
    }
};
