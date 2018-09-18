const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
const port = process.env.PORT || 3000;

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
    });
app.listen(port);
console.log('server started '+ port);