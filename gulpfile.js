const gulp = require('gulp');
const webp = require('gulp-webp');

//Supports PNG, JPEG, TIFF, WebP
const BLOG_IMAGES_SRC = 'public/assets/blog/**/*.{jpg,png,tiff}'
const IMAGES_DST = 'public/assets/blog'

gulp.task('default', () =>
    gulp.src(BLOG_IMAGES_SRC)
        .pipe(webp())
        .pipe(gulp.dest(IMAGES_DST))
);