'use strict';
const config = require('./config');
const logger = config.getLogger();

function saveNew(Collection, Item, itemID) {
    Collection.count({id: itemID})
        .then(function(count){
            if(!count) {
                Item.save()
                    .then(function() {
                        logger.info('item: "' + Item.id + '" saved');
                    }).catch(function(err) {
                        logger.error(err);
                    });
            }
            else {
                // checked date if different update
                logger.info(Item.id + ' was already saved');
            }
        }).catch(function(err) {
            logger.debug(err);
        });
}


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

exports.saveNew = saveNew;
exports.tweetLinks = tweetLinks;
