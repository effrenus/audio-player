import gulp from 'gulp';

gulp.task('copy:fonts', () => {
	gulp
		.src('app/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
})

gulp.task('copy', ['copy:fonts']);
