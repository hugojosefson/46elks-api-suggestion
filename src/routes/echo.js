export default (req, res) => res.send({
    headers: req.headers,
    body: req.body,
    req: {
        hostname: req.hostname,
        protocol: req.protocol,
        port: req.port
    }
});
