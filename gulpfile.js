var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    imagein = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    cssnano = require('gulp-cssnano'),
    jslint = require('gulp-jslint');

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('useref', function(){
   return gulp.src('app/*.html')
       .pipe(useref())
       .pipe(gulpIf('*.js', uglify()))
       .pipe(gulpIf('*.css',cssnano()))
       .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
  return gulp.src('app/assets/img/**/*+(png|jpg|gif|svg)')
  .pipe(cache(imagein({
      interlaced: true
  })))
  .pipe(gulp.dest('dist/assets/img'))
});

gulp.task('fonts', function() {
    return gulp.src('app/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('templates', function() {
    return gulp.src('app/assets/templates/**/*')
    .pipe(gulp.dest('dist/assets/templates'))
})

gulp.task('sass', function() {
  return gulp.src('app/assets/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/assets/css'))
  .pipe(browserSync.reload({
      stream: true
  }))
});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('watch',['browserSync', 'sass'], function() {
    gulp.watch('app/assets/scss/**/*.scss',['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/assets/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts', 'templates'],
        callback
    )
})

gulp.task('default',function (callback) {
    runSequence(['sass','browserSync','watch'],
        callback
    )
})