'use strict';

const config = require('./lib/config');
const logger = config.getLogger();
const schedule = require('node-schedule');
const request = require('request-promise');

const Pinboard_API_Token = config.get('pinboard_API_TOKEN');
const Pinboard_API_Endpoint = 'https://api.pinboard.in/v1/posts/recent?auth_token=' + Pinboard_API_Token + '&format=json&count=12';


// schedule.scheduleJob('*/2 * * * *', function(){
    request(Pinboard_API_Endpoint)
      .then(function (data) {
          var content = JSON.parse(data).posts;
          logger.info(content);
      })
      .catch(function (err) {
          logger.error(err.message);
      });
// });
