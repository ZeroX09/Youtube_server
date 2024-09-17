
const videoIdForm = document.getElementById("videoId-form")
const selectItems = document.getElementById("old-videos");
const Socket = io();



let videoIdInput = document.getElementById("video-id")
const old_videos = [];

videoIdForm.addEventListener("submit",function(e){
    e.preventDefault();
    let videoId = videoIdInput.value
    if(!videoId.trim())return;
    Socket.emit("video-id",videoId)
    alert(videoId)

    if(!old_videos.includes(videoId)){
        old_videos.push(videoId)
    }

    updateOldVideos();

})


function updateOldVideos(){
    selectItems.innerHTML = ""
    old_videos.forEach((videoId)=>{
        const option = document.createElement("option")
        option.value = videoId;
        let isCurrent = videoId === videoIdInput.value;
        option.innerText= videoId + (isCurrent? " (current)" :"") ;
        selectItems.appendChild(option);
        if(isCurrent){
            option.selected = true;
        }
    })
   
}


selectItems.addEventListener("change",()=>{
    videoIdInput.value = selectItems.value;
})