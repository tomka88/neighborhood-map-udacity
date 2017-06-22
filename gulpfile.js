var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
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



gulp.task('watch', ['browserSync', 'sass', 'jshint'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('js/*.js', ['jshint', 'scripts']); 
  // Other watchers
})


	// bsConfig = require("gulp-bootstrap-configurator"),
 // 	minifyCSS = require('gulp-minify-css'),
 //    minifyhtml = require('gulp-minify-html'),
 //    responsive = require('gulp-responsive'),

// For CSS 
// gulp.task('make-bootstrap-css', function(){
//   return gulp.src("./config.json")
//     .pipe(bsConfig.css({
//     	compress: true
//     }))
//     .pipe(gulp.dest("./assets"));
//     // It will create `bootstrap.css` in directory `assets`. 
// });
 
// // For JS 
// gulp.task('make-bootstrap-js', function(){
//   return gulp.src("./config.json")
//     .pipe(bsConfig.js({
//     	compress: true
//     }))
//     .pipe(gulp.dest("./assets"));
//     // It will create `bootstrap.js` in directory `assets`. 
// });