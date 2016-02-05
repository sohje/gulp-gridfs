# gulp-gridfs
Simple gridfs upload with gulp.

## Install

```
$ npm install --save-dev gulp-gridfs
```


## Usage

```js
var gulp = require('gulp');
var grid = require('gulp-gridfs');

gulp.task('task', function () {
    return gulp.src('src/file.txt')
        .pipe(grid({url: 'mongodb://localhost:27017/test'}))
		.pipe(gulp.dest('src/'))
});
```

## API

### gulp-gridfs(options)

#### options

##### url(required)

Type: `string`
Default: `null`

Give it a mongodb URI

##### filename

Type: `string`
Default: `null`

Optional new name for the file in GridFs

##### chunkSizeBytes

Type: `number`
Default: `null`

Optional overwrite mongodb bucket's chunkSizeBytes for this file

##### metadata

Type: `object`
Default: `null`

Optional object to store in the file document's metadata field

##### contentType

Type: `string`
Default: `null`

Optional string to store in the file document's contentType field

##### aliases

Type: `array`
Default: `null`

Optional array of strings to store in the file document's aliases field

##### verbose

Type: `boolean`
Default: `false`

Optional print file document's _id field

## License

MIT © [Nikolay Spiridonov](https://github.com/sohje)
