let button = document.getElementById("signUp");
let password = document.getElementById("Password");
let cpassword = document.getElementById("confirmPassword");
let pp = document.getElementById("avatar");

cpassword.addEventListener("input", function(event){
        if(password.value != cpassword.value){
            cpassword.setCustomValidity("The passwords do not match");
        } else {
            cpassword.setCustomValidity("");
        }
});

button.addEventListener("click", function(event){
    if(pp.value.length == 0){
        pp.value = "/Images/blank_avatar.png";
    }
})