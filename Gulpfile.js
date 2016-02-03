var gulp = require('gulp');
var rimraf = require("rimraf");
var newer = require('gulp-newer');
var minjs = require('gulp-uglify');
var mincss = require('gulp-cssnano');
var stylus = require('gulp-stylus');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');

var rootOutputDir = './wwwroot';

gulp.task('clean', function (cb) {
	rimraf(rootOutputDir + '/*', cb);
});

gulp.task('bootstrap', function () {
	return gulp.src('./bower_components/bootstrap/dist/**/*')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('jquery', function () {
	return gulp.src('./bower_components/jquery/dist/**/*')
		.pipe(newer(rootOutputDir + '/js/'))
		.pipe(minjs())
		.pipe(gulp.dest(rootOutputDir + '/js/'));
});

gulp.task('css', function () {
	return gulp.src('./dev/css/*')
		.pipe(newer(rootOutputDir + '/css/'))
		.pipe(stylus())
		.pipe(mincss())
		.pipe(gulp.dest(rootOutputDir + '/css/'));
});

gulp.task('js', function () {
	return gulp.src('./dev/js/*')
		.pipe(newer(rootOutputDir + '/js/'))
		.pipe(coffee())
		.pipe(minjs())
		.pipe(gulp.dest(rootOutputDir + '/js/'));
});

gulp.task('html', function () {
	return gulp.src('./dev/html/*')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(jade())
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('fonta', function () {
	return gulp.src('./bower_components/font-awesome/*')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(gulp.dest(rootOutputDir + '/'));
});


gulp.task('watch', function () {
	gulp.watch('./dev/css/*', ['css']);
	gulp.watch('./dev/js/*', ['js']);
	gulp.watch('./dev/html*', ['html']);
});


gulp.task('build', ['bootstrap', 'jquery', 'css', 'js', 'html', 'fonta']);
