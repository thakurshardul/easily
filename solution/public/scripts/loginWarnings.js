let warningCloseButton=document.querySelector("#closeWarning")
let warningContainer=document.querySelector("#warningContainer")
warningCloseButton.addEventListener("click",()=>{
    warningContainer.classList.add("hidden");
})