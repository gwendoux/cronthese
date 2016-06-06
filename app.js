'use strict';

const config = require('./lib/config');
const logger = config.getLogger();
const pinboard = require('./lib/pinboard');

const schedule = require('node-schedule');
const request = require('request-promise');
const mongoose = require('mongoose');

const Pinboard_API_Token = config.get('pinboard_API_TOKEN');
const Pinboard_API_Endpoint = config.get('Pinboard_API_ENDPOINT');

var Pinboard_Options = {
    uri: Pinboard_API_Endpoint,
    qs: {
        auth_token: Pinboard_API_Token,
        format: 'json',
        count: '12'
    }
};

mongoose.connect('mongodb://localhost/links');

var db = mongoose.connection;
db.on('error', logger.error.bind(console, 'connection error:'));
db.once('open', function() {
    logger.info('db connected');
    var linksSchema = mongoose.Schema({
        id: String,
        title: String,
        description: String,
        url: String,
        tags: String,
        date: Date
    });

    var Links = mongoose.model('Links', linksSchema);

    // schedule.scheduleJob('*/2 * * * *', function(){
        request(Pinboard_Options).then(function (data) {
            return JSON.parse(data).posts;
        }).then(function(content) {
            content.forEach(function(item) {
                var link = new Links({
                    id: item.hash,
                    title: item.description,
                    description: item.extended,
                    url: item.href,
                    tags: item.tags,
                    date: item.time
                });
                pinboard.saveNew(Links, link, item.hash)
            });
        }).catch(function (err) {
            logger.error(err.message);
        });
    });
// });
