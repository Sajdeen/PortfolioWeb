const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactBtn= document.getElementById("contactBtn");
const modal= document.getElementById("contactModal");
const closeBtn= document.querySelector("#closeModal")
const role = document.querySelector(".role")
const container = document.getElementById("project-container");
const Videomodal = document.getElementById("videoModal");
const video = document.getElementById("projectVideo");
const source = video.querySelector("source");



  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
 

  //Project slider

let index = 0;

document.getElementById("next")
.addEventListener("click", ()=>{

    if(index < 2){
        index++;
        container.style.transform=
        `translateX(-${index*320}px)`;
    }

});

document.getElementById("prev")
.addEventListener("click", ()=>{

    if(index > 0){
        index--;
        container.style.transform=
        `translateX(-${index*320}px)`;
    }

});

//typingtext

const roles = [
  "FRONTEND DEVELOPER",
  "MCA GRADUATE",
  "SOFTWARE ENGINEER"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    let currentRole = roles[roleIndex];

    if (!isDeleting) {
        role.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200); // Pause before deleting
            return;
        }

    } else {
        role.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex++;

            if (roleIndex === roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();
// role.textContent = roles[roleindex];

// setInterval(()=>{
//     roleindex++;

//     if (roleindex >= roles.length){
//         roleindex = 0;
//     }

//     role.textContent =roles[roleindex];
// },2000);

//open modal

contactBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

//closemodal

closeBtn.addEventListener("click", () =>{
    modal.style.display = "none";
    modal.style.fontSize = "20px";
    modal.style.fontFamily = "Arial, sans-serif";
modal .style.fontWeight ="bold";
});


window.addEventListener("click", (e) =>{
    if(e.target == modal){
        modal.style.display = "none";
    }
});

//project video modal

document.querySelectorAll("#watch-btn").forEach(btn => {

btn.addEventListener("click",()=>{
source.src = btn.dataset.video;
video.load();
Videomodal.style.display = "flex";
video.play();
});

});

document.getElementById("closeVideo").onclick = () => {
    Videomodal.style.display = "none";
    video.pause();
};
 window.addEventListener("click", (e) => {
    if(e.target == Videomodal){
       Videomodal.style.display = "none";
        video.pause();
    }   
 });