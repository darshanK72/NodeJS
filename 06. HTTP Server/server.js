const http = require('http');
const fs = require('fs');
const url = require('url');


// Reusable Functions

const replaceHTML = function(template,book){
    let bookTemplate = template.replace('{{title}}',book.title);
    bookTemplate = bookTemplate.replace('{{author}}',book.author);
    bookTemplate = bookTemplate.replace('{{pages}}',book.pages);
    return bookTemplate;
}

// Constants

const host = '127.0.0.1';
const port = 3000;

// Loding Files

let indexFile = fs.readFileSync('index.html', 'utf-8');
let contactFile = fs.readFileSync('contact.html', 'utf-8');
let aboutFile = fs.readFileSync('about.html', 'utf-8');
let bookFile = fs.readFileSync('book.html', 'utf-8');
let booksObj = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

let bookTemplateArray = booksObj.books.map((book) => {
    return replaceHTML(bookFile, book);
});

let server = http.createServer();

server.on('request', (req, res) => {
    let { query, pathname: path } = url.parse(req.url, true);

    if (path == '/' || path == '/home') {
        res.writeHead(200, 'Success', {
            'Content-Type': 'text/html',
            'FileName': 'index.html'
        });
        res.end(indexFile.replace('{{content}}', 'This is content for index file'));
    }
    else if (path == '/about') {
        res.writeHead(200, 'Success', {
            'Content-Type': 'text/html',
            'FileName': 'about.html'
        });
        res.end(aboutFile.replace('{{content}}', 'This is content for about file'));
    }
    else if (path == '/contact') {
        res.writeHead(200, 'Success', {
            'Content-Type': 'text/html',
            'FileName': 'contact.html'
        });
        res.end(contactFile.replace('{{content}}', 'This is content for contact file'))
    }
    else if (path == '/books') {
        res.writeHead(200, 'Success', {
            'Content-Type': 'text/html'
        });
        // console.log(booksObj.books);
        // console.log(bookTemplateArray.join(','));
        // console.log(bookTemplateArray);
        res.end(indexFile.replace('{{bookList}}', bookTemplateArray.join(',')));
    }
    else if (path == '/products') {

        res.writeHead(200, 'Success', {
            'Content-Type': 'application/json'
        });

        if (query.id) {
            res.end(query.id);
        }
        else {
            res.end('No Query Params');
        }
    }
    else {
        res.writeHead(404, 'Not Found', {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Page Not Found</h1>');
    }
});

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
})



