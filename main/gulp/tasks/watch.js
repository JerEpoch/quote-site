var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){
	browserSync.init({
		notify: false,
		proxy: "localhost:8080"
	});

	watch('./main/templates/*.html', function(){
		browserSync.reload();
	});

	watch('./main/static/style/*.css', function(){
		browserSync.reload();
	});
});

