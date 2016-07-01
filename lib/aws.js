'use strict';
const config = require('./config');
const logger = config.getLogger();
const request = require('request-promise');
const AWS = require('aws-bluebird');
const save = require('./save.js');
const url = require('./url');

AWS.config.update({
    accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY')
});

var s3 = new AWS.S3();

function saveImage(Collection, id, filepath) {
    var options = {
        uri: filepath,
        encoding: null
    };
    request(options)
        .then(function(body) {
            savetoaws(Collection, id, body, body.length);
        }).catch(function(err) {
            logger.debug(err);
        });
}



function savetoaws(Collection, id, filepath, length) {
    var data = {
        Bucket: config.get('AWS_Bucket'),
        Key: id,
        Body: filepath,
        ACL: 'public-read',
        ContentType: 'image/jpeg'
    };
    s3.putObject(data).promise()
        .then(function(resp) {
            logger.info('succesfully uploaded the image!');
            var newUrl = url.get(config.get('CloudFront_id'), data.Key);
            save.update(Collection, data.Key, newUrl);
        }).catch(function(err) {
            logger.debug(err);
            logger.debug('Error uploading data: ', data.id);
        });
}

exports.saveImage = saveImage;
