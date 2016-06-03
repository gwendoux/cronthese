'use strict';

const config = require('./lib/config');
const logger = config.getLogger();
// const schedule = require('node-schedule');
const request = require('request-promise');

const Pinboard_API_Token = config.get('pinboard_API_TOKEN');
const Pinboard_API_Endpoint = config.get('Pinboard_API_ENDPOINT');

var Pinboard_Options = {
    uri: Pinboard_API_Endpoint,
    qs: {
        auth_token: Pinboard_API_Token,
        format: 'json',
        count: '12'
    }
};

// commented out when ready to run
// schedule.scheduleJob('*/2 * * * *', function(){
request(Pinboard_Options)
      .then(function (data) {
          return JSON.parse(data).posts;
      }).then(function(content) {
          logger.info(content);
      }).catch(function (err) {
          logger.error(err.message);
      });
// });
