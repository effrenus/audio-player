import gulp from 'gulp';

gulp.task('copy:fonts', () => {
	gulp
		.src('app/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
})

gulp.task('copy:js', () => {
	gulp
		.src('app/libs/*')
		.pipe(gulp.dest('dist/libs'));
})

gulp.task('copy', ['copy:fonts', 'copy:js']);
