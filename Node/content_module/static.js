module.exports = function(request, response){
    var fs = require('fs');
    response.writeHead(200, {'Content-type': 'text/html'});

    var cssCheck = new RegExp(['.css$'])
    var imgCheck = new RegExp(['.(jpeg|jpg|png|gif|ico)$']);

    if(!cssCheck.test(request.url) && !imgCheck.test(request.url) && !fs.existsSync(`./private${request.url}.html`)){
        var path = "./views";
        if (request.url === '/')
            path += '/index.html';
        else {
            path += `${request.url}.html`;
        }
        console.log('HTML',path);
        if(fs.existsSync(path)){
            fs.readFile(path, 'utf8', function (errors, contents){
                response.write(contents);
                response.end();
            });
        } else {
            response.end('File not found!');
        }
    } else if(cssCheck.test(request.url) && !fs.existsSync(`./private${request.url}`)){
        console.log('CSS',request.url);
        if(fs.existsSync(`./stylesheet${request.url}.css`)){
            fs.readFile(`./stylesheet${request.url}.css`, 'utf8', function (errors, contents){
                response.write(contents);
                response.end();
            });
        } else {
            response.end();
        }
    } else if (imgCheck.test(request.url) && !fs.existsSync(`./private${request.url}`)){
        console.log('Img',request.url);
        if(fs.existsSync(`./images${request.url}`)){
            fs.readFile(`./images${request.url}`,function(errors,contents){
                response.write(contents);
                response.end();
            });
        } else {
            response.end();
        }
    } else {
        response.end('File not found!!!');
    }
}
