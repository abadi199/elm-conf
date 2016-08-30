var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('style', function() {
  gulp.src('styles/slides.scss')
    .pipe(sass())
    .pipe(gulp.dest('./docs/styles'))
    .pipe(browserSync.stream());
});

gulp.task('md', function() {
  var md = gulp.src('slides.md');
  gulp.src('slides.html')
    .pipe(inject(md, {
      removeTags: true,
      starttag: '<!-- inject:md -->',
      transform: function (filePath, file) {
        return file.contents.toString('utf8');
      }
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./docs'))
});

gulp.task('md-watch', ['md'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('js', function() {
  gulp.src('js/**/*.js')
    .pipe(gulp.dest('./docs/js'))
});

gulp.task('js-watch', ['js'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('images', function() {
  gulp.src('images/**/*')
    .pipe(gulp.dest('./docs/images'))
});

gulp.task('images-watch', ['images'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('watch', ['build'], function() {
  browserSync.init({
        server: "./docs"
    });

  gulp.watch('styles/**/*.scss', ['style']);
  gulp.watch('js/**/*.js', ['js-watch']);
  gulp.watch('*.md', ['md-watch']);
  gulp.watch('images/*', ['images-watch']);
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
        server: "./docs"
    });
});

gulp.task('build', ['js', 'style', 'images', 'md']);
gulp.task('default', ['build']);