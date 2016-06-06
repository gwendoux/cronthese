'use strict';
const config = require('./config');
const logger = config.getLogger();

function saveNew(Collection, Object, primaryKey) {
    Collection.count({id: primaryKey})
        .then(function(count){
            if(!count) {
                Object.save()
                    .then(function() {
                        logger.info('item: "' + Object.title + '" saved');
                    }).then(function() {
                        // post to twitter
                        tweetLinks(Object.title, Object.url);
                    }).catch(function(err) {
                        logger.error(err);
                    });
            }
            else {
                logger.info(Object.id + ' was already saved');
            }
        }).catch(function(err) {
            logger.debug(err);
        });
}


function tweetLinks(title, url) {
    logger.debug(link.title + ' / ' + link.url);
}

exports.saveNew = saveNew;
