const { Transform, PassThrough } = require('stream');

function wc() {
    const countLines = (text) => ((text || '').match(/$/mg) || []).length - 1;
    const countWords = (text) => (text || '').split(/\W+/).length - 1;
    const countLetters = (text) => ((text || '').match(/[a-z0-9]/gi) || []).length;

    return new Transform({
        objectMode: true,
        transform: (data, encoding, callback) => {
            const text = data.toString(encoding);
            callback(null, `wc: \t${countLines(text)}\t${countWords(text)}\t${countLetters(text)}\n`);
        }
    });
}


process.stdin.pipe(wc()).pipe(process.stdout);