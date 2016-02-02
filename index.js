'use strict';
var mongodb = require('mongodb');

var assign = require('object-assign');
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function(options) {
    options = assign({verbose: false}, options);
    if (options.url === undefined) {
        throw new gutil.PluginError('gulp-gridfs', '`url` required');
    }

    if (options.filename === undefined) {
        throw new gutil.PluginError('gulp-gridfs', '`filename` required');
    }

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        var args = {
            metadata: options.metadata || null,
            contentType: options.contentType || null,
            aliases: options.aliases || null,
            chunkSizeBytes: options.chunkSizeBytes || null
        };

        mongodb.MongoClient.connect(options.url, function(error, db) {
            var bucket = new mongodb.GridFSBucket(db);
            var uploadStream = bucket.openUploadStream(options.filename, args);

            uploadStream.on('error', function(error) {
                db.close();
                cb(new gutil.PluginError('gulp-gridfs', error, {fileName: file.path}));
                return;
            });

            uploadStream.on('finish', function(file) {
                if (options.verbose) {
                    gutil.log('Upload finished for', file.filename, 'and mongodb _id:', file._id);
                }
                db.close();
                cb(null, file);
            });

            if (file.isBuffer()) {
                file.pipe(uploadStream);
            }
            else if (file.isStream()) {
                file.contents.pipe(uploadStream);
            }

        });
    }, function(cb) {
        cb();
    });
}

