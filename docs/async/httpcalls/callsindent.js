
const https = require('https');

const apiKey = 'AIzaSyDAhQsIHFEDJV7dCx0fqN8_10OF7PiyLkU';

const youTubeDomain = 'https://www.googleapis.com/youtube/v3/';
const playListURL = youTubeDomain +
  'playlistItems?part=snippet&playlistId=PL39l9SxO4ZYtouUlzx_MokUds7LtArzTq&key=' + apiKey +
  '&maxResults=1';

const videoInfoURL = youTubeDomain +
  'videos?part=snippet%2CcontentDetails%2Cstatistics&key=' + apiKey;


function getVideosOfAPlaylist(playListURL, callback) {
  https.get(playListURL, (res) => {
    let data = '';

    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const videos = JSON.parse(data);
        callback(null, videos.items);
      } catch (error) {
        callback(error);
      }
      callback(null, []);
      // if (videos) {
      //   callback(null, videos);
      // }
      // callback(null, []);
    });
  });
}

getVideosOfAPlaylist(playListURL, (error, videos) => {
  if (error) {
    throw error;
  }
  console.log('received data, size: ' + videos.length);
  // const videoSnippet = videos.items[0].snippet;
  // https.get(videoInfoURL + '&id=' + videoSnippet.resourceId.videoId, (res) => {
  //
  //   let videoData = '';
  //   res.on('data', c => videoData += c);
  //   res.on('end', () => {
  //     console.log(JSON.parse(videoData));
  //   });
  //
  // });
});






