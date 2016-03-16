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
var babel = require("gulp-babel");
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

var ft = 	"<!--(C) Kaelan Fouwels <kaelan@kaelanfouwels.com> <%= new Date().getFullYear() %> Licenced under MIT-->";

var rootOutputDir = './wwwroot';

gulp.task('clean', function (cb) {
	rimraf(rootOutputDir + '/*', cb);
});

gulp.task('css', function () {
	return gulp.src('./dev/**/*.css')
		.pipe(newer(rootOutputDir + '/css/'))
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(mincss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(rootOutputDir + '/css/'));
});

gulp.task('js', function () {
	return gulp.src('./dev/**/*.js')
		.pipe(newer(rootOutputDir + '/js/'))
		.pipe(sourcemaps.init())
		.pipe(babel())
		//.pipe(minjs())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('coffee', function () {
	return gulp.src('./dev/**/*.coffee')
		.pipe(newer(rootOutputDir + '/js/'))
		.pipe(sourcemaps.init())
		.pipe(coffee())
		//.pipe(minjs())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('assets', function(){
	return gulp.src('./dev/assets/*')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('html', function () {
	return gulp.src('./dev/**/*.html')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(footer(ft))
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('jade', function () {
	return gulp.src('./dev/**/*.jade')
		.pipe(newer(rootOutputDir + '/'))
		.pipe(sourcemaps.init())
		.pipe(jade({pretty: true}))
		.pipe(footer(ft))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(rootOutputDir + '/'));
});

gulp.task('bower', function () {
	var paths = {
				"bootstrap": {"in": "bootstrap/dist/**/*", "out": ""},
				"jquery": {"in": "jquery/dist/**/*", "out":"/js"},
		}
		for (var dir in paths) {
			gulp.src('./bower_components/' + paths[dir].in)
				.pipe(newer(rootOutputDir + '/'))
				.pipe(sourcemaps.init())
				//.pipe(minjs())
				//.pipe(cleanCSS())
				.pipe(sourcemaps.write())
				.pipe(gulp.dest(rootOutputDir + paths[dir].out + '/'));
		}
	return
});

gulp.task('watch', function () {
	gulp.watch('./dev/**/*', ['build']);
});

gulp.task('nsp', function(cb) {
	gulpNSP({
		package: __dirname + '/../package.json',
		stopOnError: false
	}, cb);
});

gulp.task('build', ['bower', 'css', 'js', 'html', 'jade', 'coffee', 'assets']);
