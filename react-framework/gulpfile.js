var gulp = require('gulp');
var plugins = {
	browserSync: require('browser-sync').create(),
	sass: require('gulp-sass'),
	browserify: require('browserify'),
	source: require('vinyl-source-stream'),
	reactify: require('reactify'),
	babelify: require('babelify'),
	rename: require('gulp-rename'),
	es: require('event-stream'),
	glob: require('glob'),
	jasmine: require('gulp-jasmine'),
	jquery: require('gulp-jquery'),
	notifier: require('node-notifier'),
	uglifyify: require('uglifyify'),
	eslint: require('gulp-eslint'),
	scssLint: require('gulp-scss-lint'),
	jscs: require('gulp-jscs')
};

var config = {
	watchJsx: [
		'app/components/**/*.jsx',
		'mockdata/{,**/}*.{js}',
		'app/journeys/**/*.jsx',
		'app/flux/**/*{.js,.jsx}'
	],
	jasmine: {
		tests: 'tests/unit/'
	},
	sass: [
		'app/sass/**/*.{sass,scss}',
		'app/components/**/*.{sass,scss}'
	]
};

var
	requireDir = require('require-dir'),
	tasks = requireDir('./gulp-tasks'),
	task;

for (task in tasks) {
	gulp.task( task, tasks[task](gulp, plugins, config) );
}

gulp.task('default', ['browserSync', 'sass', 'browserify'], function() {
	gulp.watch(
		config.sass,
		['sass', 'scss-lint']
	);
	gulp.watch(
		config.watchJsx,
		['browserify']
	);
	gulp.watch(
		[
			'app/components/**/*.jsx',
			'app/journeys/**/*.jsx',
			'app/flux/**/*{.js,.jsx}'
		],
		['eslint', 'jscs']
	);
});

gulp.task('production', ['sass', 'browserify']);
