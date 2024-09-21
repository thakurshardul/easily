let deleteButton=document.querySelector("#deleteButton");
let content=document.querySelector("#content");
let dialogBox=document.querySelector("#dialogBox")
let cancelButton=document.querySelector("#cancel");
deleteButton.addEventListener("click",()=>{
    content.classList.replace("opacity-100","opacity-10");
    dialogBox.classList.replace("hidden","flex");
})
cancelButton.addEventListener("click",()=>{
    content.classList.replace("opacity-10","opacity-100");
    dialogBox.classList.replace("flex","hidden");
})