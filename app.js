'use strict';
// const schedule = require('node-schedule');
const request = require('request-promise');
const config = require('./lib/config');
const logger = config.getLogger();
const appConfig = require('./lib/config-app');
const db = require('./lib/mongoose');
const build = require('./lib/build');
const actions = require('./lib/actions');
const filter = require('./lib/filter');

// schedule for photos every 2 minutes
schedule.scheduleJob('*/2 * * * *', function(){
    request(appConfig.pinboard).then(function (resp) {
        return JSON.parse(resp).posts;
    }).then(function(content) {
        content.forEach(function(item) {
            actions.saveNew(db.Links, build.schemaLinks(db.Links, item), item.hash);
        });
    }).catch(function (err) {
        logger.error(err.message);
    });
});
// schedule for photos every 30 minutes
schedule.scheduleJob('* */30 * * *', function(){
    request(appConfig.instagram).then(function (resp) {
        return JSON.parse(resp).data;
    }).then(function(content) {
        return (filter.filterByTag(content, 'coffeeoftheday'));
    }).then(function(filteredContent) {
        filteredContent.forEach(function(item) {
            actions.saveNew(db.Coffee, build.schemaCoffee(db.Coffee, item), item.id);
        });
    }).catch(function (err) {
        logger.error(err.message);
    });
});
