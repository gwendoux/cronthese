'use strict';

const config = require('./lib/config');
const logger = config.getLogger();
// const schedule = require('node-schedule');
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

// commented out when ready to run
// schedule.scheduleJob('*/2 * * * *', function(){

    request(Pinboard_Options)
        .then(function (data) {
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
                // need to checked for duplicates
                // if duplicates update data
                // else save it
                Links.count({id: item.hash})
                    .then(function(count){
                        if(!count) {
                            link.save()
                                .then(function() {
                                    logger.debug('item: "' + link.title + '" saved');
                                }).catch(function(err) {
                                    logger.debug(err);
                                });
                        } else {
                            logger.info('already saved');
                        }
                    }).catch(function(err) {
                        logger.debug(err);
                    });

            });
        }).then(function() {
            Links.count({}, function(err, c) {
                logger.info('Count is ' + c);
            });
        }).catch(function (err) {
            logger.error(err.message);
        });
// });
});
