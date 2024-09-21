const optionsButton=document.querySelector("#menu-button");
const dropdownOptions=document.querySelector("#dropdownOptions");
const hamburger=document.querySelector("#hamburger");
const navOptions=document.querySelector("#navOptions");
const closeMenu=document.querySelector("#closeMenu");
let isDropdownHidden=true;
let navOptionsHidden=true;
optionsButton.addEventListener("click",()=>{
    if(isDropdownHidden){
        dropdownOptions.classList.replace("hidden","block");
        isDropdownHidden=false;
    }
    else{
        dropdownOptions.classList.replace("block","hidden");
        isDropdownHidden=true;
    }
    
});
hamburger.addEventListener("pointerover",()=>{
    hamburger.classList.add("cursor-pointer");
})
hamburger.addEventListener("click",()=>{
        navOptions.classList.replace("hidden","flex");
        navOptions.classList.add("flex-col");
        closeMenu.classList.replace("hidden","visible")
        hamburger.classList.replace("visible","hidden");
    })
closeMenu.addEventListener("click",()=>{
        navOptions.classList.replace("flex","hidden");
        navOptions.classList.remove("flex-col");
        closeMenu.classList.replace("visible","hidden")
        hamburger.classList.replace("hidden","visible");
})    