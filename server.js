const express = require('express');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const app = express();
const Joi = require('joi');
const PORT = 3000;

app.use(express.json());

app.post('/convert', (req, res) => {
        const {youtubeURL} = req.body;
        convertedFile = ytdl(youtubeURL, { quality: 'highestaudio' });

        async function getVideoTitle(youtubeURL) {
            try{
                const info = await ytdl.getBasicInfo(youtubeURL);
                const videoTitle = info.videoDetails.title;
                return videoTitle;
            }catch(error){
                console.error("Error fetching video info:", error);
                throw error;
            }
        
        }

        getVideoTitle(youtubeURL).then(videoTitle => {
            const sanitizedTitle = videoTitle.replace(/[\/:*?"<>|]/g, '');
            //convertedFile.on("progress", (_,downloaded,total)=>console.log(`${Math.round((downloaded/total) * 100)} %`));
            //convertedFile.on("error", (error)=>console.log(error));
            saveFile = convertedFile.pipe(fs.createWriteStream(`${sanitizedTitle}.mp3`));

            try{
                const result = localStorage.setItem("storedFile", saveFile);
                res.json(result);
            }catch(err){
                console.error(err.message);
                res.sendStatus(500);
            }
        });

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//videoConversion('https://www.youtube.com/watch?v=XPnwmZ6gf6I');

//set up api call