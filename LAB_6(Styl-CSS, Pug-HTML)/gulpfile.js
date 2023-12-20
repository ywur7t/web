var gulp = require('gulp'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync').create();

    gulp.task('stylus', function() {
            return gulp.src('./SOURCES/stylus/*.styl')
                .pipe(stylus({pretty:true}))
                .pipe(gulp.dest('./READY_PAGES/css/'))    
                .pipe(browserSync.reload({
                    stream: true
                  }));
    });
   
    gulp.task('pug', function() {
        return gulp.src('./SOURCES/pug/*.pug')
            .pipe(pug({pretty:true}))
            .pipe(gulp.dest('./READY_PAGES/html/'))    
            .pipe(browserSync.reload({
                stream: true
                }));
    });

    gulp.task('browserSync', function() {
        browserSync.init({
            server:{
                baseDir:'./READY_PAGES/pug',
                index:'main_page.html'
            },
        });
    });

    gulp.task('watch',function(){

        gulp.watch('SOURCES/**/*.styl',gulp.series('stylus'));
        gulp.watch('SOURCES/**/*.pug',gulp.series('pug')); 
    });