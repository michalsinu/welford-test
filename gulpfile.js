var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cleanCSS 	= require('gulp-clean-css');
var image 		= require('gulp-image');

gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('minifyCSS', function() {
	return gulp.src('src/css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('src/min/css'))

	console.log("CSS minified");
});

gulp.task('minifyIMG', function() {
	return gulp.src('src/assets/*')
	    .pipe(image())
	    .pipe(gulp.dest('src/min/assets'));
});

gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/scss/*.scss", gulp.series(['sass']));
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series(['minifyCSS'], ['minifyIMG'], ['serve']));

