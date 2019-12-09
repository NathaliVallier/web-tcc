// // Require gulp and plugins
// var gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     watch = require('gulp-watch');
//     // concat = require('gulp-concat');
// //     uglify = require('gulp-uglify'),
// //     gutil = require('gulp-util');
// //     connect = require('gulp-connect');


// // Define file sources
// var sassMain = ['assets/src/scss/styles.scss'];
// var sassSources = ['assets/src/scss/**/*.scss']; // Any .scss file in any sub-directory
// var jsSources = ['assets/scripts/*.js']; // Any .js file in scripts directory


// // // Task to compile SASS files
// // gulp.task('sass', function() {
// //     gulp.src(sassMain) // use sassMain file source
// //         .pipe(sass({
// //             outputStyle: 'compressed' // Style of compiled CSS
// //         })
// //             .on('error', gutil.log)) // Log descriptive errors to the terminal
// //         .pipe(gulp.dest('assets/src/css/')); // The destination for the compiled file
// // });


// // // Task to concatenate and uglify js files
// // gulp.task('concat', function() {
// //     gulp.src(jsSources) // use jsSources
// //         .pipe(concat('script.js')) // Concat to a file named 'script.js'
// //         .pipe(uglify()) // Uglify concatenated file
// //         .pipe(gulp.dest('assets/scripts/js/')); // The destination for the concatenated and uglified file
// // });


// // var watch = gulp.watch('app/scss/**/*.scss', ['sass']); 
// // Task to watch for changes in our file sources
// // gulp.task('watch', function() {
// //     gulp.watch('assets/src/scss/**/*.scss', ['sass']);
// // });
// gulp.task('default', watch);

// function watch(){
//     gulp.watch("assets/src/scss/*.scss",  ['sass']);
// }


// // // Default gulp task
// // gulp.task('default', ['sass', 'concat', 'watch']);

// // gulp.task('server', function() {
// //     connect.server({
// //       port: 8888,
// //       livereload: true
// //     });
// //   });

// gulp.task('sass', function(){
//     return gulp.src('assets/src/scss/styles.scss')
//       .pipe(sass()) // Converts Sass to CSS with gulp-sass
//       .pipe(gulp.dest('assets/src/css'));
// });

"use strict";

const gulp = require("gulp"); //diz para procurar na pasta node_modules um pacote gulp
const sass = require("gulp-sass"); //diz para procurar na pasta node_modules um pacote gulp-sass
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

sass.compiler = require("node-sass"); //para funcionar plugin gulp-sass

gulp.task('default', watch); //atribui a função watch

gulp.task('sass', compilaSass); //atribui a função à tarefa nomeada

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./web-tcc"
        }
    });

    gulp.watch("web-tcc/assets/src/scss/*.scss", ['sass']);
    gulp.watch("web-tcc/*.html").on("change", reload);
});

gulp.task(compilaSass, function() {
    return gulp.src("web-tcc/assets/src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/src/css")
        .pipe(browserSync.stream())
        );
});

// gulp.task('default', ['serve']);

gulp.task(compilaSass, function() {
    return gulp.src('assets/src/scss/**/*.scss') // Gets all files ending with .scss in app/scss
      .pipe(sass())
      .pipe(gulp.dest('assets/src/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

function compilaSass(){
    return gulp
        .src("assets/src/scss/*.scss") //diz para procurar todos os arquivos .scss localizados em pastas e subpastas
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //converse sass para CSS com gulp-sass
        .pipe(gulp.dest("assets/src/css"));
}

function watch(){
    gulp.watch("assets/src/scss/*.scss", compilaSass);
}
