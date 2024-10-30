
function startConversion(){
    
    const youtubeURL = document.getElementById("url").value;

    if(!youtubeURL){

        alert("Please enter a valid YouTube URL.");
        return;

    }

    document.getElementById("input-container").style.display = "none";

    //videoConversion(youtubeURL);
    
    //fetch an api call to backend

}
