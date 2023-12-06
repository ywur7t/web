var gulp = require('gulp');
    pug = require('gulp-pug');
    stylus = require('gulp-stylus');

    gulp.task('sty', function() {
            return gulp.src('./app/*.styl')
                .pipe(stylus({pretty:true}))
                .pipe(gulp.dest('./dist'));
    });

    gulp.task('pug', function() {
        return gulp.src('./app/*.pug')
            .pipe(pug({pretty:true}))
            .pipe(gulp.dest('./dist'));
    });