export default queryParam => middlewares => (req, res, next) => {
    const middleware = middlewares[req.query[queryParam]];
    if (middleware) {
        middleware(req, res, next);
    } else {
        next();
    }
};
