const express = require("express");
const axios = require("axios");
const { Transform } = require("stream");

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  const responseStream = await axios({
    url: "https://api.punkapi.com/v2/beers/random",
    method: "GET",
    responseType: "stream"
  });

  clearConsole();
  console.log("=================== BEGIN RESPONSE ======================");

  // log ----------> lower in file
  res.type("json");
  responseStream.data.on('end', () => console.log('=================== END RESPONSE ======================'));

  responseStream.data.pipe(log()).pipe(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));













const log = () => {
  let chunksNo = 0;

  return new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      console.log(`====== BEGIN chunk no.: ${++chunksNo} ======`);
      console.log(chunk.toString());
      console.log(`###### END chunk no.: ${chunksNo} ######`);

      callback(null, chunk);
    }
  });
};











const clearConsole = () => {
  const readline = require("readline");
  const blank = "\n".repeat(process.stdout.rows);
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};
