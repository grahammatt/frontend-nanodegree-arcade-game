/*jshint esversion: 6*/

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require('browser-sync').create();

gulp.task("default", ["styles"], function() {
  gulp.watch("styles/**/*.scss", ["styles"]);
  gulp.watch("index.html").on("change", browserSync.reload);
  gulp.watch("scripts/*.js").on("change", browserSync.reload);
  browserSync.init({
    server: "./"
  });
});

gulp.task("styles", function() {
  gulp
    .src("styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./styles"))
    .pipe(browserSync.stream());

});