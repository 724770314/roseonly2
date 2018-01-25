var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('copy-index',function () {
	gulp.src('*.html')
	.pipe(gulp.dest('E:\\phpStudy\\WWW\\qianfeng1708'));
});

gulp.task('img',function () {
	gulp.src('img/*.{JPEG,jpg,png}')
	.pipe(gulp.dest('E:\\phpStudy\\WWW\\qianfeng1708\\img'))
});

gulp.task('css',function(){
	gulp.src('css/*.css')
	.pipe(gulp.dest('E:\\phpStudy\\WWW\\qianfeng1708\\css'))
})

gulp.task('js',function(){
	gulp.src('js/*.js')
	.pipe(gulp.dest('E:\\phpStudy\\WWW\\qianfeng1708\\js'))
})

gulp.task('watchall',function () {
	gulp.watch('*.html',['copy-index']);
	gulp.watch('img/*.{JPEG,jpg,png}',['img']);
	gulp.watch('css/*.css',['css']);
	gulp.watch('js/*.js',['js']);
});

gulp.task('sass',function(){
	gulp.src('scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('E:\\roseonly2\\css'));
})