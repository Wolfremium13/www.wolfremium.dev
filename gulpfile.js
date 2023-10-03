const gulp = require('gulp');
const webp = require('gulp-webp');

//Supports PNG, JPEG, TIFF, WebP
const BLOG_IMAGES_SRC = 'public/**/*.{jpg,png,tiff}'
const IMAGES_DST = 'public'

// TODO: Se if we can use this to convert images to webp using ts instead of gulp
gulp.task('default', () =>
    gulp.src(BLOG_IMAGES_SRC)
        .pipe(webp())
        .pipe(gulp.dest(IMAGES_DST))
);