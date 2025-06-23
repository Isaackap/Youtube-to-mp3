console.log("Adding event listener to 'convert' button");

var onClick = async(event) =>{
    console.log(event);
    console.log("Button clicked");
    event.preventDefault();
    event.stopImmediatePropagation();
    var youtubeURL = document.getElementById('url').value;
    var urlCheck = youtubeURL.match(/:\/\/www.youtube.com\/.*?\bv=([^&]+)/)

    if(!youtubeURL || !urlCheck){

        alert("Please enter a valid YouTube URL.");
        return;
        
    }else{

        try{
            console.log("Sending POST request....");
            var response = await fetch('http://localhost:3000/convert', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({youtubeURL})
            });
            console.log("POST request completed.");
            console.log("Response status: ", response.status);
            
            if(response.ok){
                var data = await response.json();
                console.log("success", data);
                //localStorage.setItem('savedFile', data.fileName);
                //let file = localStorage.getItem('savedFile');
                //console.log(file);
                document.getElementById('form-convert').style.display = "none";
                /*let elements = document.getElementsByClassName('form-convert');
                for(let i = 0; i < elements.length; i++){
                    elements[i].style.display = 'none';
                }*/
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
//document.querySelectorAll('form-convert').style.display = 'none';

//document.getElementById('form-convert').style.display = "none";

