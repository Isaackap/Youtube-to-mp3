const express = require('express');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const app = express();
const Joi = require('joi');
const PORT = 3000;
const path = require('path');
const { error } = require('console');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/convert', (req, res) => {
        const {youtubeURL} = req.body;

        try{
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
                const saveFile = convertedFile.pipe(fs.createWriteStream(`public/converted_files/${sanitizedTitle}.mp3`));
                
                saveFile.on('finish', () =>{
                    res.json({
                        message: "File saved successfully", fileName: `${sanitizedTitle}.mp3`
                    });
                })

                saveFile.on('error', (error) =>{
                    console.error("Error saving file: ", error);
                    res.sendStatus(500);
                });
            
            });
        }catch(error){
            console.error("Error processing request:", error);
            res.sendStatus(500);
        }

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//videoConversion('https://www.youtube.com/watch?v=XPnwmZ6gf6I');

//set up api call