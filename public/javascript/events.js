let eventImage = document.getElementById("eventPic");
let button = document.getElementById("eventSubmit");


button.addEventListener("click", function(event){
   if(eventImage.value.length == 0){
       eventImage.value = "/Images/017.JPG";
   }
});

