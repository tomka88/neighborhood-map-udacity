var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plugins = require('gulp-load-plugins')
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('jshint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){
  return gulp.src()
})


gulp.task('watch', ['browserSync', 'sass', 'jshint'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('js/*.js', ['jshint', 'scripts']); 
  // Other watchers
})