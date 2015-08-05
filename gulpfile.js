//MODO DE USO:
//
//Ejecutar desde una consola node.JS el comando "gulp default" genera a partir del código en src/** y scss/** lo correspindiente dentro de www/
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var bower   = require('bower');
var concat  = require('gulp-concat');
var sass    = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename  = require('gulp-rename');
var jshint  = require('gulp-jshint');
var uglify  = require('gulp-uglify');
var sh      = require('shelljs');
var fs      = require('fs');
var header  = require("gulp-header");
var imagemin  = require("gulp-imagemin");
var cache  = require("gulp-cache");
var ngAnnotate  = require("gulp-ng-annotate");

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./src/**/*.js'],
  imagesSrc: ['./images/**/*']
};

// Get version using NodeJs file system
var getVersion = function () {
    return fs.readFileSync('./Version.txt');
};
 
// Get copyright using NodeJs file system
var getCopyright = function () {
    return fs.readFileSync('./Copyright.txt');
};

gulp.task('default', ['sass', 'lint', 'minify', 'images']);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// Lint JS
gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('minify', function(){
  return gulp.src(paths.js)
    .pipe(ngAnnotate())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('www/js'))
    .pipe(header(getCopyright(), {version: getVersion()}))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/js'));
});

gulp.task('processlibs', ['lintlibs', 'minifylibs']);

gulp.task('lintlibs', function() {
  return gulp.src('./www/lib/ng-grid/plugins/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minifylibs', function(){
  return gulp.src('./www/lib/ng-grid/plugins/*.js')
    .pipe(ngAnnotate())
    .pipe(concat('ng-grid-plugins.js'))
    .pipe(gulp.dest('www/lib/ng-grid'))
    .pipe(rename('ng-grid-plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/lib/ng-grid'));
});

gulp.task('images', function() {
  return gulp.src(paths.imagesSrc)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('www/img'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['lint', 'minify'])
  gulp.watch(paths.images, ['images']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
