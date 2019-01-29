const fs = require('fs')  
const path = require('path')  
const axios = require('axios')

async function downloadImage () {  
  const url = 'https://unsplash.com/photos/z6wdpf9fpM4/download?force=true';
  const filePath = path.resolve(__dirname, 'images', 'code.jpg');
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  });
}

downloadImage();