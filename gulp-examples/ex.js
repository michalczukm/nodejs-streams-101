const {
    Transform,
    Duplex,
    Writable
} = require('stream');
const path = require('path');
const fs = require('fs');

const wc = (() => {
    const countLines = (text) => ((text || '').match(/$/mg) || []).length - 1;
    const countWords = (text) => (text || '').split(/\W+/).length - 1;
    const countLetters = (text) => ((text || '').match(/[a-z0-9]/gi) || []).length;

    return new Transform({
        objectMode: true,
        transform: (data, encoding, callback) => {
            const text = data.toString('utf8');
            console.log(`wc: \t${countLines(text)}\t${countWords(text)}\t${countLetters(text)}\n`);

            callback(null, data);
        }
    });
})();

const join = (...streams) => streams.reduce((pt, s, i, a) => {
    s.pipe(pt, {
        end: false
    })
    s.once('end', () => a.every(s => s.ended) && pt.emit('end'))
    return pt
}, new PassThrough());


const concat = new Duplex({
    objectMode: true,
    write(chunk, encoding, callback) {
        this.push(chunk);
        callback();
    },
    read(){}
});

const dest = (filePath) => {
    const stream = new Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            fs.appendFile(filePath, chunk, { encoding }, (error) => callback(error));
        },
    });

    return stream;
};

const reportProgress = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      process.stdout.write('.');
      callback(null, chunk);
    }
  });


const src = (dir, extension) => {
    const duplexStream = new Duplex({
        objectMode: true,
        write(chunk, encoding, callback) {
            this.push(chunk);
            callback(null, chunk);
        },
    
        read(size) {}
    });

    fs.readdirSync(dir)
        .filter(filePath => filePath.match(new RegExp(`${extension}$`, 'i')))
        .map(filePath => path.join(dir, filePath))
        .forEach(filePath => {
            fs.createReadStream(filePath, {
                encoding: 'utf8'
            }).pipe(duplexStream);
        });

    return duplexStream;
};


src('src', '.js')
    .pipe(reportProgress)
    .pipe(wc)
    .pipe(concat)
    .pipe(dest('foo.js'));