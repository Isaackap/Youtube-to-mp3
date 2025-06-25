// file url
// http://localhost:3000/


console.log("Adding event listener to 'convert' button");

// Convert function
var onClick = async(event) =>{
    console.log(event);
    console.log("Button clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    // Checks if url input validity
    var youtubeURL = document.getElementById('url').value;
    var urlCheck = youtubeURL.match(/:\/\/www.youtube.com\/.*?\bv=([^&]+)/)

    if(!youtubeURL || !urlCheck){

        alert("Please enter a valid YouTube URL.");
        return;
        
    }else{

        try{
            // API call to backend server
            console.log("Sending POST request....");
            var response = await fetch('http://localhost:3000/convert', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({youtubeURL})
            });
            console.log("POST request completed.");
            console.log("Response status: ", response.status);
            // If successful response from back, save the file to localStorage and change UI
            if(response.ok){
                var data = await response.json();
                console.log("success", data);
                localStorage.setItem('savedFile', data.fileName);
                let file = localStorage.getItem('savedFile');
                console.log(file);
                document.getElementById('form-convert').style.display = "none";
                document.getElementById('form-download').style.display = "block";
            } else{
                console.error("Error response: ", await response.json());
            }
    
        } catch(error){
            console.error("Request failed: ", error);
        }
    }
}

document.getElementById('convert').removeEventListener('click', onClick);
document.getElementById('convert').addEventListener('click', onClick);

// Function when Return to Home button is pressed
function returnToHome(){
    // Reset UI back to initial state
    document.getElementById('form-download').style.display = "none";
    document.getElementById('form-convert').style.display = "block";
    // Clear input field and clear out the localStorage
    document.getElementById('url').value = '';
    localStorage.removeItem('savedFile');
    // Confirm its been reset
    console.log("localStorage savedFile after clearing: ", localStorage.getItem('savedFile'));
}

// Function when Donload button is pressed
document.getElementById('download').addEventListener('click', () => {
    const file = localStorage.getItem('savedFile');
    if(file){
        const a = document.createElement('a');
        a.href = `converted_files/${file}`;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        //window.location.href = `/converted_files/${file}`; // Can be used to preview the .mp3 first, might use later.
        localStorage.removeItem('savedFile');
    } else{
        alert("No file available to download.");
    }
});

