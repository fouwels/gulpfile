var gulp = require('gulp');
var rimraf = require("rimraf");
var newer = require('gulp-newer');
var minjs = require('gulp-uglify');
var mincss = require('gulp-cssnano');
var stylus = require('gulp-stylus');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var footer = require('gulp-footer');
var gulpNSP = require('gulp-nsp');


var ft = 	"(C) Kaelan Fouwels <kaelan@kaelanfouwels.com> <%= new Date().getFullYear() %> Licenced under MIT";

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
		//.pipe(minjs())
		.pipe(gulp.dest(rootOutputDir + '/js/'));
});

gulp.task('css', function () {
	return gulp.src('./dev/css/*')
		.pipe(newer(rootOutputDir + '/css/'))
		.pipe(stylus())
		.pipe(mincss())
		.pipe(footer())
		.pipe(gulp.dest(rootOutputDir + '/css/'));
});

gulp.task('js', function () {
	return gulp.src('./dev/js/*')
		.pipe(newer(rootOutputDir + '/js/'))
		//.pipe(minjs())
		.pipe(gulp.dest(rootOutputDir + '/js/'));
});

gulp.task('coffee', function () {
	return gulp.src('./dev/coffee/*')
		.pipe(newer(rootOutputDir + '/js/'))
		.pipe(coffee())
		.pipe(minjs())
		.pipe(footer())
		.pipe(gulp.dest(rootOutputDir + '/js/'));
});

gulp.task('assets', function(){
	return gulp.src('./dev/assets/*')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('html', function () {
	return gulp.src('./dev/html/*')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('jade', function () {
	return gulp.src('./dev/jade/*')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('fonta', function () {
	return gulp.src('./bower_components/font-awesome/**/*')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(gulp.dest(rootOutputDir + '/'));
});


gulp.task('watch', function () {
	gulp.watch('./dev/css/*', ['css']);
	gulp.watch('./dev/js/*', ['js']);
	gulp.watch('./dev/html/*', ['html']);
	gulp.watch('./dev/jade/*', ['jade']);
});
gulp.task('nsp', function(cb) {
<<<<<<< HEAD
	gulpNSP({package: __dirname + '/../package.json'}, cb);
});
=======
	gulpNSP({
		package: __dirname + '/../package.json',
		stopOnError: false
	}, cb);
});

>>>>>>> defbded093617af2de06c452d429baa6237acab8

gulp.task('build', ['bootstrap', 'jquery', 'css', 'js', 'html', 'fonta', 'jade', 'coffee', 'assets']);
