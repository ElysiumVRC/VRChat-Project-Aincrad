const params = new URLSearchParams(location.search);
const monster = params.get("name");

fetch(`attack/${monster}.json`)
.then(res=>res.json())
.then(data=>renderMonster(data));

function renderMonster(data){

const root =
document.getElementById("monster-detail");

root.innerHTML=`

<div class="top-section">

  <div class="left">

    <h1>${data.name}</h1>

    <img src="${data.image}" class="detail-image">

  </div>

  <div class="right">

    <div>Col : ${data.col}</div>
    <div>EXP : ${data.exp}</div>

    <h2>ドロップ</h2>
    <div class="drop-list">
      ${data.drops.map(d=>`<div class="drop-item">${d}</div>`).join("")}
    </div>

  </div>

</div>

<h2>出現場所</h2>

<div class="map-wrap">

  <div class="map-tabs">
    ${data.maps.map((m,i)=>
      `<button onclick="switchMap('${m.image}')">${m.label}</button>`
    ).join("")}
  </div>

  <img id="mapImage" src="${data.maps[0].image}" class="map-image">

</div>

<h2>攻撃方法</h2>

<div class="attack-tabs">
${data.attacks.map(a=>
`<button onclick='showAttack(${JSON.stringify(JSON.stringify(a))})'>
➤ ${a.name}
</button>`
).join("")}
</div>

<div id="attackBox"></div>
`;

showAttack(JSON.stringify(data.attacks[0]));
}

function switchMap(src){
document.getElementById("mapImage").src=src;
}

function showAttack(raw){

const a=JSON.parse(raw);

document.getElementById("attackBox").innerHTML=`
<video controls class="attack-video">
<source src="${a.video}">
</video>

<p>${a.desc}</p>
`;
}
