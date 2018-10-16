<<<<<<< HEAD
/*jshint esversion: 6*/

=======
>>>>>>> de0bced70061c829b12dec03f90c8bd3b1c0515a
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require('browser-sync').create();

gulp.task("default", ["styles"], function() {
<<<<<<< HEAD
  gulp.watch("styles/**/*.scss", ["styles"]);
  gulp.watch("index.html").on("change", browserSync.reload);
  gulp.watch("scripts/*.js").on("change", browserSync.reload);
=======
  gulp.watch("sass/**/*.scss", ["styles"]);
>>>>>>> de0bced70061c829b12dec03f90c8bd3b1c0515a
  browserSync.init({
    server: "./"
  });
});

gulp.task("styles", function() {
  gulp
<<<<<<< HEAD
    .src("styles/**/*.scss")
=======
    .src("sass/**/*.scss")
>>>>>>> de0bced70061c829b12dec03f90c8bd3b1c0515a
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
<<<<<<< HEAD
    .pipe(gulp.dest("./styles"))
=======
    .pipe(gulp.dest("./css"))
>>>>>>> de0bced70061c829b12dec03f90c8bd3b1c0515a
    .pipe(browserSync.stream());

});