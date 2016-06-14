const date = require('./date');

function schemaLinks(Collection, Object) {
    return new Collection({
        id: Object.hash,
        title: Object.description,
        description: Object.extended,
        url: Object.href,
        tags: Object.tags,
        date: Object.time,
        shared: false
    });
}

function schemaCoffee(Collection, Object) {
    return new Collection({
        id: Object.id,
        caption: Object.caption.text,
        image: {
            standard: {
                url: Object.images.standard_resolution.url,
                width: Object.images.standard_resolution.width,
                height: Object.images.standard_resolution.height
            },
            thumbnail: {
                url: Object.images.thumbnail.url,
                width: Object.images.thumbnail.width,
                height: Object.images.thumbnail.height
            }
        },
        likes: Object.likes.count,
        origlink: Object.link,
        date: date.UTtoISODate(Object.created_time)
    });
}

exports.schemaLinks = schemaLinks;
exports.schemaCoffee = schemaCoffee;
