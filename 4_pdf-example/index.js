const express = require('express');
const bodyParser = require('body-parser')
const converter = require('./convert');

const app = express();
const port = process.env.PORT || 8000;

const handleErrors = (error, res) => res.status(500).send(error.message || error);

app.post('/', bodyParser.text({type: '*/*' }), async (req, res) => {
    const pdfStream = await converter(req.body);

    pdfStream.pipe(res)
        .type('application/pdf')
        .on('error', error => handleErrors(error, res));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));