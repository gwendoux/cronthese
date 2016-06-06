'use strict';

const config = require('./lib/config');
const logger = config.getLogger();
const pinboard = require('./lib/pinboard');
const appConfig = require('./lib/config-app');
const schedule = require('node-schedule');
const request = require('request-promise');
const mongoose = require('mongoose');

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

    schedule.scheduleJob('*/2 * * * *', function(){
        request(appConfig.pinboard).then(function (data) {
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
                pinboard.saveNew(Links, link, item.hash);
            });
        }).catch(function (err) {
            logger.error(err.message);
        });
    });
});
