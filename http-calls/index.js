const express = require('express');
const axios = require('axios');
const { Transform } = require('stream');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3010;

let chunksNo = 0;

const sign = new Transform({
    transform(chunk, encoding, callback) {
        console.log('=== chunk no.:', ++chunksNo);

        callback(null, chunk);
    }
});

app.get('/', async (req, res) => {
    const responseStream = await axios({
        url: 'https://api.punkapi.com/v2/beers/random',
        method: 'GET',
        responseType: 'stream'
    });

    responseStream.data.pipe(sign).pipe(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));