const mongoose = require('mongoose');

var links = mongoose.createConnection('mongodb://localhost/links');
var coffee = mongoose.createConnection('mongodb://localhost/coffee');

var Links = links.model('Links', new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    url: String,
    tags: String,
    date: Date,
    shared: Boolean
}));

var Coffee = coffee.model('Coffee', new mongoose.Schema({
    id: String,
    caption: String,
    image: {
        standard: {
            url: String,
            width: Number,
            height: Number
        },
        thumbnail: {
            url: String,
            width: Number,
            height: Number
        }
    },
    likes: Number,
    origlink: String,
    date: Date
}));

exports.Links = Links;
exports.Coffee = Coffee;
