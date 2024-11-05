const express = require('express');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const app = express();
const Joi = require('joi');
const PORT = 3000;

app.use(express.json());

function videoConversion(youtubeURL){

    const convertedFile = ytdl(youtubeURL, { quality: 'highestaudio' });

    async function getVideoTitle(youtubeURL) {
        try{
            const info = await ytdl.getBasicInfo(youtubeURL);
            return info.videoDetails.title;
        }catch(error){
            console.error("Error fetching video info:", error);
            throw error;
        }
        
    }

    getVideoTitle(youtubeURL).then(videoTitle => {
        const sanitizedTitle = videoTitle.replace(/[\/:*?"<>|]/g, '');
        //convertedFile.on("progress", (_,downloaded,total)=>console.log(`${Math.round((downloaded/total) * 100)} %`));
        //convertedFile.on("error", (error)=>console.log(error));
        convertedFile.pipe(fs.createWriteStream(`${sanitizedTitle}.mp3`));
    });

}

videoConversion('https://www.youtube.com/watch?v=XPnwmZ6gf6I');

//set up api call