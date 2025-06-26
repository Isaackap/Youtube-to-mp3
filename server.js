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
    console.log("Request received:", req.body);
    const {youtubeURL} = req.body;

    if(!youtubeURL || !ytdl.validateURL(youtubeURL)){
        return res.status(400).json({error: "Invalid YouTube URL."});
    }

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
            const tempPath = path.join(__dirname, 'temp', 'converted_files', `${sanitizedTitle}.mp3`);
            const saveFile = convertedFile.pipe(fs.createWriteStream(tempPath));
            // Makes directory if doesn't already exist
            /*const outputDir = path.join(__dirname, 'temp', 'converted_files');
            if(!fs.existsSync(outputDir)){
                fs.mkdirSync(outputDir, {recursive: true});
            }*/
                
            saveFile.on('finish', () =>{
                console.log("File saved successfully");

                const timeoutTime = 5 * 60 * 1000; // 5 minutes
                setTimeout(() => {
                    fs.unlink(tempPath, (err) => {
                        if(err){
                            console.error(`Failed to delete ${tempPath}:`, err);
                        }else{
                            console.error(`Deleted expired file: ${tempPath}`);
                        }
                    });
                }, timeoutTime);

                res.json({
                    message: "File saved successfully",
                    fileName: `${sanitizedTitle}.mp3`,
                    fileURL: `/download/${sanitizedTitle}.mp3`
                });
            })

            saveFile.on('error', (error) =>{
                console.error("Error saving file: ", error);
                res.status(500).json({error: "Error saving file"});
            });

            //setTimeout(() => {
             //   fs.unlink()
            //});
            
        }).catch(err => {
            console.error("Error fetching video info: ", err);
            res.status(500).json({error: "Error fetching video info"});
        });

    }catch(error){
        console.error("Error processing request:", error);
        res.sendStatus(500);
    }

});

app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'temp', 'converted_files', filename);

  console.log("Attempting to download: ", filePath);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).send("File not found");
    }
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
