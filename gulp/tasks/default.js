import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', function() {
	runSequence(
		'jade',
		'webpack',
		'styles',
		'browserSync',
		'watch'
		);
});

gulp.task('build', ['del'], function() {
	gulp.start(
		'styles',
		'jade',
		'scripts',
		'copy'
	);
});
