import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import errorHandler from '../errorHandler';

gulp.task('styles', () => {

	gulp
		.src('app/styles/default.sass')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/styles'));

});
