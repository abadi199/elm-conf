var gulp = require('gulp');
var remark = require('gulp-remark');
var rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.src('slides.md')
    .pipe(remark())
    .pipe(rename({
      basename: 'index', 
      extname: '.html'
    }))
    .pipe(gulp.dest("./dist"));

});