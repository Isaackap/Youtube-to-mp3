const express = require('express');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');

function videoConversion(youtubeURL){

    const convertedFile = ytdl(youtubeURL, { quality: 'highestaudio' });             //on("progress", (_,downloaded,total)=>console.log(downloaded));                //pipe(fs.createWriteStream('video.mp4'));
    
    convertedFile.on("progress", (_,downloaded,total)=>console.log(`${Math.round((downloaded/total) * 100)} %`));
    convertedFile.on("error", (error)=>console.log(error));
    convertedFile.pipe(fs.createWriteStream('video.mp3'));

    console.log('test');

}

videoConversion('https://www.youtube.com/watch?v=XPnwmZ6gf6I');

//set up api call