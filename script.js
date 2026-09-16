const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const closebtn = document.querySelector("#closetoggle")
const contactBtn= document.getElementById("contactBtn");
const modal= document.getElementById("contactModal");
const closeBtn= document.querySelector("#closeModal")
const role = document.querySelector(".role")
const container = document.getElementById("project-container");
const Videomodal = document.getElementById("videoModal");
const video = document.getElementById("projectVideo");
const source = video.querySelector("source");
const webcard = document.querySelector("#webcard");
const toolcard = document.querySelector("#toolcard");
const webskills = document.querySelector(".web-dev-skills");
const toolskills = document.querySelector(".tools-skills");


// NAV MENU

const toggleItems = document.querySelectorAll(".nav-links .hide");

toggle.addEventListener("click", () => {

    toggle.classList.toggle("active");
    navLinks.classList.toggle("active");

    toggleItems.forEach(item => {
        item.classList.remove("hide");
    });

});

closebtn.addEventListener("click", () => {

    toggle.classList.remove("active");
    navLinks.classList.remove("active");

    toggleItems.forEach(item => {
        item.classList.add("hide");
    });

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
    document.body.style.overflow = "hidden"; // Prevent page scrolling

video.play();
});

});

document.getElementById("closeVideo").onclick = () => {
    Videomodal.style.display = "none";
     document.body.style.overflow = "auto";
    video.pause();
};
 window.addEventListener("click", (e) => {
    if(e.target == Videomodal){
       Videomodal.style.display = "none";
        video.pause();
    }   
 });


 // skills 

 window.addEventListener("load", ()=>{
   const path = document.getElementById("road-path");
   const pathGlow = document.getElementById("road-path-glow");
   const pathBorder = document.getElementById("road-path-border");
   const pathSurface = document.getElementById("road-path-surface");
  
   const rocket = document.getElementById("rocket-node");
   const startNode = document.getElementById("start-node");
  const nodes = document.querySelectorAll(".skill-node");
   const endNode = document.querySelector(".end-node");
   const svg = document.querySelector(".road-svg");


   console.log("check Elements:",{
  path:path,
   rocket:rocket,
   nodesCount:nodes.length,
   svg:svg
 })

   if (!path || !rocket || !nodes.length || !svg)  return;
     const pathLength = path.getTotalLength();
   const startStop = 0.02;
   const nodeStops = [0.19, 0.40, 0.61, 0.82];
   const endStop = 0.98;

  // Filter out any null elements automatically
   const roadPaths = [path, pathGlow, pathBorder, pathSurface].filter(Boolean);

   function updateRoadProgress(percent) {
     const drawLength = pathLength * percent;

    roadPaths.forEach(p => {
       p.style.strokeDasharray = `${pathLength}`;
       p.style.strokeDashoffset = `${pathLength - drawLength}`;
     });
   }

   function getPixelPoint(percent) {
     const point = path.getPointAtLength(pathLength * percent);
    const svgRect = svg.getBoundingClientRect();
    
   // Dynamically fetch SVG viewBox dimensions (fallback to 1000x400 if unset)
    const viewBox = svg.viewBox.baseVal;
    const baseWidth = viewBox.width || 1000;
     const baseHeight = viewBox.height || 400;

    const scaleX =  svgRect.width / baseWidth;
     const scaleY =svgRect.height / baseHeight;
   return {
      x: point.x * scaleX,
      y: point.y * scaleY
     };
   }

   function alignNodesToPath() {
     if (startNode) {
      const startPos = getPixelPoint(startStop);
      startNode.style.left = `${startPos.x}px`;
       startNode.style.top = `${startPos.y}px`;
     }

     nodes.forEach((node, index) => {
      if (nodeStops[index] !== undefined) {
        const pos = getPixelPoint(nodeStops[index]);
        node.style.left =`${pos.x}px`;
        node.style.top = `${pos.y}px`;
       }
     });

    if (endNode) {
       const endPos = getPixelPoint(endStop);
      endNode.style.left = `${endPos.x}px`;
     endNode.style.top = `${endPos.y}px`;
    }
   }

   function resetNodes() {
     nodes.forEach(node => {
      const circle = node.querySelector(".progress-circular");
      const percentText = node.querySelector(".skill-percentage");
      if (circle) {
         circle.style.setProperty("--progress", 0);
         circle.style.opacity = "0.3";
         circle.style.transform = "scale(0.85)";
       }
     if (percentText) percentText.innerText = "0%";
     });
   if (endNode) endNode.classList.remove("active");
    updateRoadProgress(0);
   }

   function moveRocketTo(targetPercent, callback) {
     let currentPercent = parseFloat(rocket.dataset.percent || 0);
     const duration = 1000;
    const startTime = performance.now();

     function animate(time) {
       let elapsed = time - startTime;
       let progress = Math.min(elapsed / duration, 1);
       let animatedPercent = currentPercent + (targetPercent - currentPercent) * progress;

       const pos = getPixelPoint(animatedPercent);
       rocket.style.left = `${pos.x}px`;
      rocket.style.top = `${pos.y}px`;

       updateRoadProgress(animatedPercent);

       if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        rocket.dataset.percent = targetPercent;
        if (callback) callback();
  }
  }
     requestAnimationFrame(animate);
   }

   function fillSkill(node, callback) {
     const circle = node.querySelector(".progress-circular");
     const percentText = node.querySelector(".skill-percentage");
     const targetVal = parseInt(node.getAttribute("data-val")) || 80;

     if (circle) {
       circle.style.opacity = "1";
       circle.style.transform = "scale(1)";
     }

     let count = 0;
     const interval = setInterval(() => {
       if (count >= targetVal) {
         clearInterval(interval);
         setTimeout(callback, 300);
       } else {
         count++;
        if (circle) circle.style.setProperty("--progress", count);
  if (percentText) percentText.innerText = `${count}%`;
       }
     }, 12);
   }

   function startRoadmapAnimation() {
     resetNodes();
    rocket.dataset.percent = startStop;

     const startPos = getPixelPoint(startStop);
     rocket.style.left = `${startPos.x}px`;
     rocket.style.top = `${startPos.y}px`;

     let step = 0;

    function runNextStep() {
     if (step >= nodeStops.length) {
       moveRocketTo(endStop, () => {
        if (endNode) endNode.classList.add("active");
          setTimeout(startRoadmapAnimation, 2500);
         });
         return;
      }

     moveRocketTo(nodeStops[step], () => {
         fillSkill(nodes[step], () => {
          step++;
           runNextStep();
         });
      });
    }

     runNextStep();


   alignNodesToPath();
   window.addEventListener("resize", () => {
     alignNodesToPath();
    const currentPercent = parseFloat(rocket.dataset.percent || startStop);
   const pos = getPixelPoint(currentPercent);
     rocket.style.left = `${pos.x}px`;
     rocket.style.top = `${pos.y}px`;
     updateRoadProgress(currentPercent);
   });
  }
   startRoadmapAnimation();

});

// skill toolcards render

const toolsData=[
{
  name:"Bootstrap",
  desc:"Building responsive and mobile-first websites quickly.",
  bgColor:"#7952b3",
  iconText:"B",
  activeDots:3
},
{
  name:"Tailwind CSs",
  desc:"Creating modern, custom designs with utility- first approach.",
  bgColor:"#38bdf8",
  iconText:"~~",
  activeDots:4
},
{
  name:"Git & Github",
  desc:"Version control and collaboration using Git & Github.",
  bgColor:"#0a080d",
  iconText:"github",
  activeDots:5
},
{
  name:"VS Code",
  desc:"My go-to code editor for fast and efficient development.",
  bgColor:"#007acc",
  iconText:"",
  activeDots:3
}
];

const gridContainer = document.getElementById("toolsGrid");

//Dynamic rendering loop

toolsData.forEach(tool => {
  
  let dotsHtml='';
  for(let i = 0; i<5; i++){
    dotsHtml +=`<span class = "dot ${i< tool.activeDots ? 'active' : '' }"></span`;

  }
  //card creation

  const card = document.createElement('div');

  card.className='tool-card';

  card.innerHTML =`<div class="tool-card-content">
  <div class= "icon-box" style="background-color: ${tool.bgColor}22; color:${tool.bgColor};">
  ${tool.iconText}
  </div>
  <div>
  <div class = "card-title">${tool.name}</div>
  <div class="card-desc">${tool.desc}</div>
  </div>
  <div class ="dots-container">
  ${dotsHtml}</div>
  </div>
  </div>`;
  gridContainer.appendChild(card);
});

