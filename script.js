document.getElementById("convert").addEventListener('click', async() =>{

    const youtubeURL = document.getElementById('url').value;
    const urlCheck = youtubeURL.match(/:\/\/www.youtube.com\/.*?\bv=([^&]+)/)

    if(!youtubeURL){

        alert("Please enter a valid YouTube URL.");
        return;

    }else if(!urlCheck){
        alert("Please enter a valid Youtube URL");
    }else{

        try{
            const response = await fetch('http://localhost:3000/convert', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({youtubeURL})
            });
    
            if(response.ok){
                const data = await response.json();
                console.log("success", data);
                localStorage.setItem('savedFile', data.fileName);
    
    
            } else{
                console.error("Error response: ", await response.json());
            }
    
        } catch(error){
            console.log("Request failed: ", error);
        }

    }


});
    
    

//document.getElementById("input-container").style.display = "none";
