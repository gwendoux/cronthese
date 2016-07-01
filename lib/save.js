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
            }
        }).catch(function(err) {
            logger.debug(err);
        });
}

function update(Collection, itemID, newData) {
    Collection.findOneAndUpdate({'id':itemID}, {'image.url': newData}, {upsert:true})
        .then(function() {
            logger.info(itemID + ' updated');
        }).catch(function(err) {
            logger.debug(err);
        });
}

exports.saveNew = saveNew;
exports.update = update;
