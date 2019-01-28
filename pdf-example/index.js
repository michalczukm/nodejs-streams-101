const express = require('express');
const bodyParser = require('body-parser')
const converter = require('./convert');

const app = express();
const port = process.env.PORT || 3000;

const handleErrors = (error) => res.status(500).send(error.message || error);

app.post('/pdf', bodyParser.text({type: '*/*' }), async (req, res) => {
    const pdfBuffer = await converter(req.body);

    res.type('application/pdf')
        .header('Content-length', pdfBuffer.length)
        .on('error', handleErrors)
        .end(pdfBuffer);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));