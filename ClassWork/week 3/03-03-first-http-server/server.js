// http server
// routing system, a way to respond to requests
// content to provide the client
// port to listen

const http = require('http');
const port = process.env.PORT || 8010;
var fs = require('fs');

function handleRequest(request, response) {
  //  inspect request
  console.log(`we got a request for ${request.url} using ${request.method}`);
    // url
    // content
    // method [post, get, delete, put, patch]
    // response.setHeader('Content-Type', 'image/jpg');

  if (request.url === '/') {
    fs.readFile('index.html', 'utf8', function(errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });
  } else if (request.url === '/donut') {
    var contents = fs.readFileSync('donut.html');
    response.write(contents);
    response.end();
  } else {
    var readStream = fs.createReadStream('else.html');
    readStream.pipe(response);
  }
}


var server = http.createServer(handleRequest);

server.listen(port, function() {
  console.log(`the server is now listening on port ${port}`);
});
