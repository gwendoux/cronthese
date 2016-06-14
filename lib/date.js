const moment = require('moment');

function UTtoISODate(input_date) {
    return moment(input_date, 'X').format();
}

exports.UTtoISODate = UTtoISODate;
