const { Transform } = require('stream');

function wc() {
    const countWords = (text) => (text || '').split(/\W+/).length -1;
    const countLetters = (text) => {
        const match = (text || '').match(/[a-z0-9]/gi);
        return (match || []).length;
    };

    return new Transform({
        objectMode: true,
        transform: (data, _, done) => {
            const text = data.toString('utf8');
            done(null, `wc: ${countWords(text)}\t${countLetters(text)}\n`);
        }
    });
}


process.stdin.pipe(wc()).pipe(process.stdout);