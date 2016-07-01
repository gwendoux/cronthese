'use strict';

function clean(url) {
    return url.split(/[?#]/)[0];
}

function get(server_id, id) {
    return 'https://' + server_id + '.cloudfront.net/' + id;
}

exports.clean = clean;
exports.get = get;
