var http = require('http');

var fs = require('fs');

var server = http.createServer(function(request,response){
    console.log('client request url: ',request.url);
    if(request.url === '/cars'){
        fs.readFile('./views/cars.html','utf8',function(errors,contents){
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(contents);
            response.end();
        });
    } else if(request.url === '/cats'){
        fs.readFile('./views/cats.html','utf8',function(errors,contents){
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(contents);
            response.end();
        });
    } else if(request.url === '/cars/new'){
        fs.readFile('./views/new_car.html','utf8',function(errors,contents){
            response.writeHead(200,{'Content-Type':'text/html'});
            response.write(contents);
            response.end();
        });
    } else if(request.url === '/stylesheets/style.css'){
        fs.readFile('./stylesheets/style.css', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents);
            response.end();
        });
    } else if(request.url === '/images/car1.jpg'){
        fs.readFile('./images/car1.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    } else if(request.url === '/images/car2.jpg'){
        fs.readFile('./images/car2.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    } else if(request.url === '/images/cat1.jpg'){
        fs.readFile('./images/cat1.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    } else if(request.url === '/images/cat2.jpg'){
        fs.readFile('./images/cat2.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    } else {
        response.writeHead(404);
        response.end('File not found!');
    }
});

server.listen(6789);

console.log("Running in localhost at port 6789");
