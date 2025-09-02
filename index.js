const express = require('express');
const request = require('request');
const app = express();

// Serve static files (your player page)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CNBC Live Stream</title>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/CNBC_2023.svg/500px-CNBC_2023.svg.png" type="image/png">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.16/mediaelementplayer.min.css" />
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #000;
            color: #fff;
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

          .mejs__container {
            width: 90vw !important;
            max-width: 400px;
          }
        </style>
      </head>
      <body>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/CNBC_2023.svg/500px-CNBC_2023.svg.png" alt="CNBC Logo" />
        <h1>CNBC Live Stream</h1>
        <audio id="player" controls autoplay preload="none">
          <source src="/stream" type="audio/mpeg" />
        </audio>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.16/mediaelement-and-player.min.js"></script>
        <script>
          const player = new MediaElementPlayer('player', {
            features: ['playpause', 'progress', 'current', 'duration', 'volume'],
            success: function (mediaElement, originalNode, instance) {
              // MediaElement player is ready
            }
          });
        </script>
      </body>
    </html>
  `);
});

// Proxy stream with SSL cert ignored
app.get('/stream', (req, res) => {
  const streamUrl = 'https://radiokrug.ru/usa/CNBC/icecast.audio';
  request({
    url: streamUrl,
    headers: {
      'Referer': 'https://radiostationusa.fm/'
    },
    agentOptions: {
      rejectUnauthorized: false   // <-- ignore SSL errors
    }
  }).on('error', (err) => {
    console.error('Stream error:', err.message);
    res.status(500).send('Error fetching stream');
  }).pipe(res);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
