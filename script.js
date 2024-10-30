const EventEmitter = require('events');
const emitter = new EventEmitter();

import { videoConversion } from './server.js';

function startConversion(){
    
    const youtubeURL = document.getElementById("url").value;

    if(!youtubeURL){

        alert("Please enter a valid YouTube URL.");
        return;

    }

    document.getElementById("input-container").style.display = "none";

    videoConversion(youtubeURL);

}
