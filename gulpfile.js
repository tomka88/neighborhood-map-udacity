var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plugins = require('gulp-load-plugins'),
    rename = require('gulp-rename');
    
var mainBowerFiles = require('main-bower-files');

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
});

//concatenate & minify JS

gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('jshint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('watch', ['scripts', 'sass', 'jshint'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/*.js', ['jshint', 'scripts']); 
  // Other watchers
})

gulp.task('default', ['scripts', 'jshint', 'sass'])