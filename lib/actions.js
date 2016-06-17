'use strict';
const config = require('./config');
const logger = config.getLogger();
const aws = require('aws-s3-promisified')({
    accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY')
});

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
            }
        }).catch(function(err) {
            logger.debug(err);
        });
}

function saveToAWS(item) {
    aws.putFile(config.get('AWS_Bucket'), item.id, filepath)
        .then(function(resp) {
            // return public url
            // set permission ?
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
exports.saveToAWS = saveToAWS;
exports.tweetLinks = tweetLinks;
