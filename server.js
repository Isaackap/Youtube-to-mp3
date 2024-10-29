const fs = require('fs');
const ytdl = require('ytdl-core');

export function videoConversion(youtubeURL){

    const convertedFile = ytdl(youtubeURL).pipe(fs.createWriteStream('video.mp4'));
    
    console.log('test');
}