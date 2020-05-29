"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send("I'm an Image Processing API");
});
app.listen(3001, function () {
    console.log('App is listening on port 3001');
});
