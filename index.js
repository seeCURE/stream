const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CNBC Live Stream</title>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/CNBC_2023.svg/500px-CNBC_2023.svg.png" type="image/png">
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #000000;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 100vh;
          }

          img {
            width: 120px;
            margin-bottom: 20px;
          }

          h1 {
            font-size: 1.8rem;
            margin: 0 0 1rem;
          }

          audio {
            width: 90vw;
            max-width: 400px;
            height: 50px;
          }

          @media (hover: none) and (pointer: coarse) {
            audio {
              height: 60px;
            }
          }
        </style>
      </head>
      <body>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/CNBC_2023.svg/500px-CNBC_2023.svg.png" alt="CNBC Logo" />
        <h1>CNBC Live Stream</h1>
        <audio controls autoplay>
          <source src="/stream" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </body>
    </html>
  `);
});

app.get('/stream', (req, res) => {
  const streamUrl = 'https://radiokrug.ru/usa/CNBC/icecast.audio';
  request({
    url: streamUrl,
    headers: {
      'Referer': 'https://radiostationusa.fm/'
    }
  }).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});