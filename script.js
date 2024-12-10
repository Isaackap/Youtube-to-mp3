console.log("Adding event listener to 'convert' button");
document.getElementById('convert').addEventListener('click', async(event) =>{
    console.log("Button clicked");
    event.preventDefault();
    const youtubeURL = document.getElementById('url').value;
    const urlCheck = youtubeURL.match(/:\/\/www.youtube.com\/.*?\bv=([^&]+)/)

    if(!youtubeURL){

        alert("Please enter a valid YouTube URL.");
        return;

    }else if(!urlCheck){
        alert("Please enter a valid Youtube URL");
    }else{

        try{
            console.log("Sending POST request....");
            const response = await fetch('http://localhost:3000/convert', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({youtubeURL})
            });
            console.log("POST request completed.");
            console.log("Response status: ", response.status);
    
            if(response.ok){
                const data = await response.json();
                console.log("success", data);
                //localStorage.setItem('savedFile', data.fileName);
                //let file = localStorage.getItem('savedFile');
                //console.log(file);
                let elements = document.getElementsByClassName('form-convert');
                for(let i = 0; i < elements.length; i++){
                    elements[i].style.display = 'none';
                }
            } else{
                console.error("Error response: ", await response.json());
            }
    
        } catch(error){
            console.error("Request failed: ", error);
        }
    }
});
//document.querySelectorAll('form-convert').style.display = 'none';

//document.getElementById('form-convert').style.display = "none";

