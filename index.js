// require your server and launch it
const server = require('./api/server');

const port = 4000;

server.listen(port, () => {
    console.log(`!!! server listening on port ${port} !!!`)
})
