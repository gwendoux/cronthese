'use-strict';

const config = require('./config');

const Pinboard_API_Token = config.get('Pinboard_API_TOKEN');
const Pinboard_API_Endpoint = config.get('Pinboard_API_ENDPOINT');

var pinboard = {
    uri: Pinboard_API_Endpoint,
    qs: {
        auth_token: Pinboard_API_Token,
        format: 'json',
        count: '12'
    }
};

const Instagram_ACCESS_TOKEN = config.get('Instagram_ACCESS_TOKEN');
const Instagram_API_Endpoint = config.get('Instagram_API_ENDPOINT');

var instagram = {
    uri: Instagram_API_Endpoint,
    qs: {
        access_token: Instagram_ACCESS_TOKEN,
        count: '20'
    }
};

exports.pinboard = pinboard;
exports.instagram = instagram;
