'use strict';
const config = require('./config');
const logger = config.getLogger();

function tweetLinks(Collection, Object) {
    Collection.find({id: Object.hash})
        .then(function(){
            logger.debug("shared", Object.shared);
            if(Object.shared === false) {
                logger.debug(Object.title + ' / ' + Object.url);
                // Collection.update({id:primaryKey}, {shared:true});
            } else {
                logger.info(Object.id + ' was already shared');
            }
        });
}

exports.tweetLinks = tweetLinks;
