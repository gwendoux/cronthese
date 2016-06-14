function filterByTag(result, tag) {
    return result.filter(function(photo) {
        return photo.tags.indexOf(tag) > -1;
    });
}

exports.filterByTag = filterByTag;
