const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const postcss = require('gulp-postcss');


function server(done) {
  browsersync.init({
    ui: false,
    proxy: "localhost:3000",
    reloadDelay: 500,
    files: ['public/css/main.css', 'templates/**/*.pug']
  });
  done();
}

function watch(done) {
  gulp.watch('./src/main.css', tailwindBuild);
}

function tailwindBuild() {
  return gulp.src('./src/main.css')
    .pipe( postcss() )
    .pipe( gulp.dest('./public/css/') );
}

const dev = gulp.series(server, watch);
exports.dev = dev;