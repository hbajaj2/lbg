var prettyError = require('./helpers/prettyError.js');

module.exports = function (gulp, plugins) {
	return function () {
		gulp
			.src('app/sass/*.scss')
			.pipe(plugins.sass({
				includePaths: ['app/components']
			})
			.on('error', function(err){
				var pError = prettyError(err);

				console.log(pError.message);
				console.log(pError.stack);
				plugins.notifier.notify({ title: 'Sass Build Error', message: pError.message });
				this.emit('end');
			}))
			.pipe(plugins.rename({
				extname: '.css'
			}))
			.pipe(gulp.dest('app/assets/css'))
			.pipe(plugins.browserSync.stream());
		};
};
