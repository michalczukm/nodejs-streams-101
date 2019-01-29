const {
    src,
    dest,
    series
} = require('gulp');
var concat = require('gulp-concat');
const del = require('del');

function clean() {
    return del('dist');
}

function bundle() {
    return src('src/*.js')
        .pipe(concat('main.js'))
        .pipe(dest('dist'))
};

exports.default = series(clean, bundle);