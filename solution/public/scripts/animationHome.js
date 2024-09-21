let animateBlock=document.querySelector("#animationBlock");
let text="Job Opportunities and Internships"
function addSpans() {
    text.split("").forEach(letter => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.classList.add("opacity-0","text-3xl");
      animateBlock.appendChild(span);
    });
  }
addSpans();

  function animateText() {
    const spans = animateBlock.querySelectorAll("span")
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.replace("opacity-0","opacity-100");
      }, index * 80);
    });
  }
animateText();
  function deanimateText() {
    const spans = animateBlock.querySelectorAll("span");
    for(let i=spans.length-1, j=0;i>=0;i--,j++){
      setTimeout(() => {
        spans[i].classList.replace("opacity-100","opacity-0");
      },3000+(80*j)); // Adjust the duration as needed
    }
  }
  deanimateText();
  setInterval(()=>{
    animateText();
    deanimateText();
  },6000)
