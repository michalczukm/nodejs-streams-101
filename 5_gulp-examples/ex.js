const {
    Transform,
    Duplex,
    Writable
} = require('stream');
const path = require('path');
const fs = require('fs');





{

const dir = 'src';
const extension = '.js';







const duplexStream = new Duplex({
    objectMode: true,
    write(chunk, encoding, callback) {
        this.push(chunk);
        callback(null, chunk);
    },

    read(size) {}
});











fs.readdirSync(dir)
    .filter(filePath => 
        filePath.match(new RegExp(`${extension}$`, 'i'))
    )
    .map(filePath => path.join(dir, filePath))
    //['src/index.js', 'src/users.js']














    .forEach(filePath => {
        fs.createReadStream(filePath, {
            encoding: 'utf8'
        }).pipe(duplexStream);
    });













    
    const concat = new Duplex({
        objectMode: true,
        write(chunk, encoding, callback) {
            this.push(chunk);
            callback();
        },
        read() {}
    });








    {
        duplexStream.pipe(concat)
    }










    
    const dest = (filePath) => {
        const stream = new Writable({
            objectMode: true,
            write(chunk, encoding, callback) {
                fs.appendFile(filePath, chunk, {
                    encoding
                }, (error) => callback(error));
            },
        });
    
        return stream;
    };










    


    duplexStream.pipe(concat).pipe(dest('foo.js'))












}



















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













const concat = new Duplex({
    objectMode: true,
    write(chunk, encoding, callback) {
        this.push(chunk);
        callback();
    },
    read() {}
});











const dest = (filePath) => {
    const stream = new Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            fs.appendFile(filePath, chunk, {
                encoding
            }, (error) => callback(error));
        },
    });

    return stream;
};

















src('src', '.js')
    .pipe(concat)
    .pipe(dest('foo.js'));















// .pipe(reportProgress)
// .pipe(wc)


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




const reportProgress = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        process.stdout.write('.');
        callback(null, chunk);
    }
});