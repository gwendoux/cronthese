'use-strict';

const config = require('./config');

const Pinboard_API_Token = config.get('pinboard_API_TOKEN');
const Pinboard_API_Endpoint = config.get('Pinboard_API_ENDPOINT');

var pinboard = {
    uri: Pinboard_API_Endpoint,
    qs: {
        auth_token: Pinboard_API_Token,
        format: 'json',
        count: '12'
    }
};

exports.pinboard = pinboard;
