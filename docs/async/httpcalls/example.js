
const https = require('https');
// const fs = require('fs');
//
//
// const url = '';
//
// // fs.readdir('asdf', {}, )
//
// https.get(url, (res) => {
//   let data = '';
//
//   res.on('data', chunk => {
//     data += chunk;
//   });
//
//   res.on('end', () => {
//     console.log(JSON.parse(data));
//   });
// });

// channel -> get videos
// each video -> get title, description and duration

// something -> channel -> videos



const apiKey = 'AIzaSyDAhQsIHFEDJV7dCx0fqN8_10OF7PiyLkU';

const youTubeDomain = 'https://www.googleapis.com/youtube/v3/';
const playListURL = youTubeDomain +
  'playlistItems?part=snippet&playlistId=PL39l9SxO4ZYtouUlzx_MokUds7LtArzTq&key=' + apiKey +
  '&maxResults=1';

const videoInfoURL = youTubeDomain +
  'videos?part=snippet%2CcontentDetails%2Cstatistics&key=' + apiKey;

youtubeModule.getVideoInfo(videoId, (video) => {
  // writeToFile
  console.log(video);
});

https.get(playListURL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const videoSnippet = JSON.parse(data).items[0];

    https.get(videoInfoURL + '&id=' + videoSnippet.snippet.resourceId.videoId, (res) => {

      let videoData = '';
      res.on('data', c => videoData += c);
      res.on('end', () => {
        console.log(JSON.parse(videoData));
      });

    });

  });
});

