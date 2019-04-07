const {
    src,
    dest,
    series
} = require('gulp');

const concat = require('gulp-concat');
const del = require('del');
const { Transform, PassThrough } = require('stream');

function clean() {
    return del('dist');
}

function bundle() {
    return src('src/*.js')
        .pipe(wc)
        .pipe(reportProgress)
        .pipe(sleep(2000))
        .pipe(concat('main.js'))
        .pipe(dest('dist'))
};

exports.default = series(clean, bundle);














// .pipe(reportProgress)
// .pipe(sleep(5000))
// .pipe(wc)




const reportProgress = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      process.stdout.write('.');
      callback(null, chunk);
    }
  });

const wc = (() => {
    const countLines = (text) => ((text || '').match(/$/mg) || []).length - 1;
    const countWords = (text) => (text || '').split(/\W+/).length - 1;
    const countLetters = (text) => ((text || '').match(/[a-z0-9]/gi) || []).length;

    return new Transform({
        objectMode: true,
        transform: (data, encoding, callback) => {
            const text = data.contents.toString('utf8');
            console.log(`wc: \t${countLines(text)}\t${countWords(text)}\t${countLetters(text)}\n`);
            callback(null, data);
        }
    });
})();

const sleep = (ms) => new PassThrough({
    objectMode: true,
    transform(chunk, encoding, callback) {
        process.stdout.write('zzzzz');
        setTimeout(() => callback(null, chunk), ms);
    }
})
