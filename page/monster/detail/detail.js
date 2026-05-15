const path =
decodeURIComponent(
location.pathname
.split("/")
.pop()
.replace(".html","")
);

async function loadMonster(){

const res =
await fetch(`./attack/${path}.json`);

const data =
await res.json();

/* top */

document.querySelector("h1").textContent =
data.name;

document.querySelector(".detail-image").src =
data.image;

document.querySelectorAll(".detail-stat")[0].textContent =
`Col : ${data.stats.col}`;

document.querySelectorAll(".detail-stat")[1].textContent =
`EXP : ${data.stats.exp}`;

document.querySelector(".drop-list").innerHTML =
data.drops.map(d=>
`<div class="drop-item">${d}</div>`
).join("");

loadMaps(data.maps,data.defaultMap);
loadAttacks(data.attacks);

}

function loadMaps(maps,defaultMap){

const tabs =
document.getElementById("map-tabs");

const img =
document.getElementById("map-image");

tabs.innerHTML="";

maps.forEach(map=>{

const btn =
document.createElement("button");

btn.textContent =
map.label;

if(map.id===defaultMap){
btn.classList.add("active");
img.src=map.image;
}

btn.onclick=()=>{

document
.querySelectorAll("#map-tabs button")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

img.src=map.image;

};

tabs.appendChild(btn);

});

}

function loadAttacks(attacks){

const container =
document.getElementById("attack-list");

container.innerHTML="";

attacks.forEach(atk=>{

const div =
document.createElement("div");

div.className="attack-box";

div.innerHTML=`

<button class="attack-toggle">
<span class="arrow">▶</span>
${atk.title}
</button>

<div class="attack-content">

<video class="attack-video" controls>
<source src="${atk.video}">
</video>

<p>${atk.description}</p>

</div>
`;

const btn =
div.querySelector(".attack-toggle");

const content =
div.querySelector(".attack-content");

const arrow =
div.querySelector(".arrow");

btn.onclick=()=>{

const open =
content.classList.toggle("open");

arrow.textContent =
open ? "▼" : "▶";

};

container.appendChild(div);

});

}

loadMonster();
