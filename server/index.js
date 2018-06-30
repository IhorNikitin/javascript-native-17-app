const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./server/db/db.json');
const db = require('./db/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
    if (req.method === 'GET' && req.originalUrl === '/articles/count') {
        const count = db.articles.length;
        res.status(200);
        res.json({'count': count});
    }
    else {
        next();
    }
});

server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running!')
});
