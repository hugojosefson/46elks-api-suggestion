export default res => error => {
    const body = error && error.response && error.response.body;
    if (body === 'Invalid number id') {
        res.sendStatus(404);
    } else if (body && (body.startsWith('Missing key') || /^Key .*? missing$/.test(body))) {
        res.status(400).type('text').send(body);
    } else if (body && (body.startsWith('Not enough credits'))) {
        res.status(402).type('text').send(body);
    } else {
        const statusCode = error && error.response && error.response.statusCode || 500;
        if (body) {
            res.status(statusCode).send(body);
        } else {
            res.sendStatus(statusCode);
        }
    }
};
