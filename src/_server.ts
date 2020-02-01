import * as http from 'http'

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req:any, res:any) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('./build/index.html');
        res.end('Hello World');
    }else{
        console.log(req.body)
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});