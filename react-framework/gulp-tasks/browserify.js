var prettyError = require('./helpers/prettyError.js');

module.exports = function (gulp, plugins) {

	require('./helpers/taskTracker.js')(gulp);

	function getFilename(path){
		//console.log(path.split('/').slice(-1));
		return path.split('/').slice(-1)[0];
	}

	return function() {
		var entries = plugins.glob.sync('app/journeys/**/*.mount.jsx');
		var transforms = [['babelify', {'loose': 'all', ignore: ['app/assets/js/vendor/jquery.custom.js']}]];

		if( gulp.currentStartTaskName === 'production' ) {
			transforms.push(['uglifyify',{global:true}]);
		}
		var bundles = entries.map(function(entry){
			return plugins.browserify(entry, {
				transform: transforms
			})
			.bundle()
			.on('error', function(err){
				var pError = prettyError(err);

				console.log(pError.message);
				console.log(pError.stack);
				plugins.notifier.notify({ title: 'Browserify Build Error', message: pError.message });
				this.emit('end');
			})
			.pipe(plugins.source( getFilename(entry) ))
			.pipe(plugins.rename({
				extname: gulp.currentStartTaskName === 'production'? '.min.js' : '.js'
			}))
			.pipe(gulp.dest('app/assets/js/bundles'));

		});
		return plugins.es.merge.apply(null, bundles)
			.pipe(plugins.browserSync.stream());
	}
};
