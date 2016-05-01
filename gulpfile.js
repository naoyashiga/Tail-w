var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    jade = require('gulp-jade'),
    gulpReplace = require('gulp-replace'),
    runSequence = require('run-sequence'),
    fs = require('fs'),
    webserver = require('gulp-webserver');

var config = {
     sassPath: './resources/sass/',
     jadePath: './resources/jade/',
    compiledCssPath: 'public/css/style.css',
}

gulp.task('server', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port: 8001,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('jade', function() {
  return gulp.src([
    config.jadePath + "/**/*.jade"
  	])
    .pipe(
		jade({
			pretty: true
		})
	)
    .pipe(gulp.dest('./'));
});

gulp.task('css', function() { 
	return sass(config.sassPath + '/**/*.scss', {
             /*style: 'compressed',*/
            style: 'expanded',
             loadPath: [
                 './resources/sass'
             ]
		})
        .on("error", notify.onError(function (error) {
        	return "Error: " + error.message;
         }))
         .pipe(gulp.dest('./resources/css')); 
});

 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
     gulp.watch(config.jadePath + '/**/*.jade', ['jade']); 
});

  gulp.task('default', ['watch','server']);