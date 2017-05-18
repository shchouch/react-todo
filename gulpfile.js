var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename');
  changed = require('gulp-changed');

var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var csscomb = require('gulp-csscomb');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-html-minifier');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({stream:true}));
});



gulp.task('htmlminify', function() {
  gulp.src('src/*.html')
  //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream:true}));

});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/main.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }}))
    .pipe(changed('./dist/styles/'))
    .pipe(sass())
    //.pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
    .pipe(csscomb())
    .pipe(cssnano({
      core: false,
      discardComments: false,
      discardUnused: false,
      mergeRules: true,
      minifyFontValues: true
    }))
    //.pipe(sourcemaps.write('.'))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dist/styles/'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(csscomb())
    // .pipe(cssnano({
    //   core: true,
    //   discardComments: true,
    //   discardUnused: true,
    //   mergeRules: true,
    //   minifyFontValues: true
    // }))
    // .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('vendorjs', function(){
  return gulp.src(['!src/js/app.js', 'src/js/vendor/*.js'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }}))
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('dist/js/'));
  // .pipe(rename({suffix: '.min'}))
  // .pipe(uglify())
  // .pipe(gulp.dest('dist/js/'))
});
gulp.task('mainjs', function() {
  return gulp.src('src/js/app.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .on('error', function(e) {
      console.error(e);
      this.emit('end');
    })
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js'));

});

gulp.task('es6', function() {
  return browserify('src/js/app.js', {paths: ['./src/js'], debug: true})
    .transform("babelify", {presets: ["es2015", "react"], compact: false})
    .bundle()
    .on('error', function(err){
      console.log(err.stack);
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('webpack', function() {
  return gulp.src('src/js/app.js')
    .pipe(webpack( webpackConfig ))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}));
});



gulp.task('default', ['browser-sync'], function(){

  gulp.watch('src/img/**/*', ['images']);
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("src/js/vendor/*.js", ['vendorjs']);
  gulp.watch("src/js/**/*.js", ['webpack']);
  gulp.watch("src/*.html", ['htmlminify']);

});
