(function() {
  var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish')
    inject = require('gulp-inject'),
    runSequence = require('gulp-run-sequence'),
    bower = require('main-bower-files'),
    clean = require('gulp-clean'),
    del = require('del');

  gulp.task('lint', function() {
    return gulp.src('./app/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail'));
  });

  gulp.task('bower', function() {
    return gulp.src(bower())
      .pipe(gulp.dest('./app/vendor'));
  });

  gulp.task('copy', function() {
    return gulp.src('./app/vendor/bootstrap.min.js') 
      .pipe(gulp.dest('./app/vendor/js')),
      gulp.src('./app/vendor/bootstrap*.min.css')
      .pipe(gulp.dest('./app/vendor/css')),
      gulp.src('./app/vendor/*.{eot,svg,ttf,woff,woff2}')
      .pipe(gulp.dest('./app/vendor/fonts'));
  });

  gulp.task('del:bootstrap', function() {
    return del([
      './app/vendor/bootstrap*',
      './app/vendor/*.{svg,eot,ttf,woff,woff2}'
    ]);
  });

  gulp.task('clean:vendor', function() {
    return gulp.src('./app/vendor')
      .pipe(clean());
  });

  gulp.task('inject', function() {
    return gulp.src('./app/index.html')
      .pipe(gulp.dest('./dist'))
      .pipe(inject(gulp.src([
        './app/vendor/jquery.js',
        './app/vendor/angular.js', 
        './app/vendor/**/*', 
        './app/app.js',
        './app/*.js',
        './app/**/*'
        ], 
        {read:false}), {relative:true}))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('build', function(cb) {
    runSequence(
      'clean:vendor',
      'bower',
      'copy',
      'del:bootstrap',
      'inject',
      cb
    );
  });
})();