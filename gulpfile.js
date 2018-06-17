"use strict";

var gulp = require("gulp");
var fs = require("fs");
var shell = require('gulp-shell');
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var run = require("run-sequence");

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css")) //поменять на build
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("source/css")) //поменять на build
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "source/", //поменять на build
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/js/*.js").on("change", server.reload);
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("sync", function(done) {
  run(
    "style",
    "serve",
    done
  );
});

gulp.task('start', shell.task([
  'mkdir source',
  'touch source\\index.html',
  'mkdir source\\js source\\sass source\\css source\\img',
  'touch source\\sass\\style.scss source\\js\\script.js'
]))
