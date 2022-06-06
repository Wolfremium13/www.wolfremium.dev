const gulp = require('gulp');
const webp = require('gulp-webp');

//Supports PNG, JPEG, TIFF, WebP
const BLOG_IMAGES_SRC = 'public/assets/blog/**/*.{jpg,png,tiff,gif,jfif,webp}'
const IMAGES_SRC = 'public/assets/*.{jpg,png,tiff,gif,jfif,webp}'

gulp.task('default', () =>
    gulp.src(BLOG_IMAGES_SRC)
        .pipe(webp())
        .pipe(gulp.dest('public/assets/temp'))
);