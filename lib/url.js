'use strict';

function clean(url) {
    return url.split(/[?#]/)[0];
}

exports.clean = clean;
