const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const port = process.env.PORT || 3000;
const {exec} = require('child_process');

http.createServer(function (request, response) {

    let main_url = url.parse(request.url);
    let path_name = main_url.pathname;

    if (path_name === '/' || path_name === '/products.html') {
        const products_path = path.join(__dirname, '..', 'pages', 'products.html');
        fs.readFile(products_path, function(error, data) {
            if (error) {
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.end('<h3>ERROR: Was unable to load products page.</h3>');
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
        return;
    }

    if (path_name === '/style.css') {
        const style_path = path.join(__dirname, '..', 'css', 'style.css');

        fs.readFile(style_path, function(error, data) {
            if (error) {
                console.log("FAILURE: Unable to find css files.")
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.end('<h3>ERROR: Server error occurred.</h3>');
            } else {
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.end(data);
            }
        });
        return;
    }

    if (request.url === '/get_books' || path_name === '/get_books') {
        exec('php ' + path.join(__dirname, '..', 'php', 'database.php'), (input, output, error) => {
            if (error) {
                console.error("FAILURE: Executive error: " + error + ".");
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.end('<h3>ERROR: Server error occurred.</h3>');
                return;
            }

            response.writeHead(500, {'Content-Type': 'text/html'});
            response.end(output);
        });
    }

    else {
        console.log("FAILURE: Unable to find page.");
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.end('<h3>ERROR: Page Not Found.');
    }

}).listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('SUCCESS: Server is running.');
    }
});