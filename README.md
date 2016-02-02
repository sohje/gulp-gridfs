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
