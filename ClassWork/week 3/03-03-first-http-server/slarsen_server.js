//http server
//port to listen

// var - can be reassigned
const http = require('http'); //cannot be re-assigned, will be "constant"
const port = process.env.PORT || 8010;
var fs = require('fs');

function handleRequest(request,response){
    console.log(`we got a request on url: ${request.url} using ${request.method}`);
    //inspect request
        //url
        //content
        //method [post, get, delete, put, patch]

    // response.setHeader('Content-Type','image/jpg');

    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write('{}');
    response.end('');

    if(request.url === "/"){
        fs.readFile('index.html','utf8',function(errors, contents){
            response.writeHead(200,{'Content-Type':'type/html'});
            response.write(contents);
            response.end();
        });
    } else if (request.url === '/donut'){
        response.end('this is the dount route');
    } else {
        response.end('you requested a different route');
    }
}

var server = http.createServer(handleRequest);

server.list(port, function(){
    console.log(`Listening on port ${port} for activity`);
})
