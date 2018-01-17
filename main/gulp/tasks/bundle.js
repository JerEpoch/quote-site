var gulp = require('gulp');
var babel = require("gulp-babel");
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// gulp.task('bundle', function() {
//     return browserify({
//         extensions: ['.js', '.jsx'],
//         entries: 'main/static/src/js/main.js',
//     })
//     .transform(babelify.configure({
//         ignore: /(bower_components)|(node_modules)/
//     }))
//     .bundle()
//     .on("error", function (err) { console.log("Error : " + err.message); })
//     .pipe(gulp.dest('dist'));
// });

gulp.task('bundle', () => {
    browserify(['main/static/src/js/main.js'])
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('main/static/src/js/dist'))
    .pipe(buffer());
});

// gulp.task('bundle', function() {
//     //browserify('main/static/src/js/main.js')
//     gulp.src("main/static/src/js/main.js")
//     .pipe(babelify.configure({
//         presets: ["es2015"]
//     }))
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('main/static/src/js/dist'));
// });

// gulp.task('testbundle', function() {
//     browserify('main/static/src/js/main.js')
//     return gulp.src("main/static/src/js/main.js")
//     .pipe(babel())
//     .pipe(gulp.dest('main/static/src/js/dist'));
// });