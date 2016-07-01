'use strict';
const config = require('./config');
const logger = config.getLogger();
const request = require('request-promise');
const AWS = require('aws-bluebird');

AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3();

function saveImage(id, filepath) {
    var options = {
        uri: filepath,
        encoding: null
    };
    request(options)
        .then(function(body) {
            savetoaws(id, body, body.length);
        }).catch(function(err) {
            logger.debug(err);
        });
}



function savetoaws(id, filepath, length) {
    var data = {
        Bucket: config.get('AWS_Bucket'),
        Key: id,
        Body: filepath,
        ACL: 'public-read',
        ContentType: 'image/jpeg'
    };
    s3.putObject(data).promise()
        .then(function(data) {
            logger.info('succesfully uploaded the image!');
            // updated database with public-link
        }).catch(function(err) {
            logger.debug(err);
            logger.debug('Error uploading data: ', data.id);
        });
}

exports.saveImage = saveImage;
