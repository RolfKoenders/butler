'use strict';
const gulp = require('gulp');
const runSequence = require('run-sequence');
const xo = require('gulp-xo');

gulp.task('default', callback => {
	runSequence([
		'lint'
	], callback);
});

gulp.task('lint', () => {
	return gulp.src([
		'gulpfile.js',
		'config/*.js',
		'lib/*.js',
		'handlers/*.js'
	]).pipe(xo({quiet: true}));
});
