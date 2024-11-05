document.getElementById("convert").addEventListener('click', async() =>{

    const youtubeURL = document.getElementById("url").value;

    if(!youtubeURL){

        alert("Please enter a valid YouTube URL.");
        return;

    }

    try{

        const response = await fetch(`/convert?url=${encodeURIComponent(youtubeURL)}`,{
            method: 'GET',
            headers:{
                'Content-type': 'application/json'
            }
        });

        if(response.ok){
            const data = await response.json();
        } else{
            const errorData = await response.json();
        }

    } catch(error){

        console.log("Request failed: ", error);

    }

});
    
    

//document.getElementById("input-container").style.display = "none";
