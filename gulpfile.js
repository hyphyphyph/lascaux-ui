var gulp         = require('gulp')
    , source     = require('vinyl-source-stream')
    , streamify  = require('gulp-streamify')
    , browserify = require('browserify')
    , uglify     = require('gulp-uglify')
    , sass       = require('gulp-sass')
    , jade       = require('gulp-jade')
    , debowerify = require('debowerify')
    , jadeify    = require('jadeify');

var config = {
  dest: './build/client'
};

gulp.task('scripts', function () {
  var bundler = browserify('./src/client/app.js');
  bundler.transform(debowerify)
    .transform(jadeify);
  return bundler.bundle()
    .pipe(source('build.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.dest));
});

gulp.task('sass', function () {
  return gulp.src('./src/client/style/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(config.dest))
});

gulp.task('jade', function () {
  return gulp.src('./src/client/index.jade')
    .pipe(jade())
    .pipe(gulp.dest(config.dest));
});

gulp.task('default', ['scripts', 'sass', 'jade']);