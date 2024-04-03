// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');

// Create web server
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);

// create comments
var comments = require('./comments.json');
var fs = require('fs');

// get comments
function getComments() {
    return comments;
}

// add comment
function addComment(comment) {
    comments.push(comment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
}

// export functions
module.exports = {
    getComments: getComments,
    addComment: addComment
};

// Path: index.js
// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = require('./comments');

// create web server
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);

// get comments
console.log(comments.getComments());

// add comment
comments.addComment('Hello!');

// get comments
console.log(comments.getComments());