let eventImage = document.querySelector(".eventPic");
let button = document.querySelector(".eventSubmit");
let date = document.querySelector(".eventDate");
let today = new Date().toISOString();


button.addEventListener("click", function(event){
   if(eventImage.value.length == 0){
       eventImage.value = "/Images/017.JPG";
   }
   else if(date.value < today){
      date.setCustomValidity("Your event date cannot be before current date.");
   }else{
      date.setCustomValidity("");
   }
});