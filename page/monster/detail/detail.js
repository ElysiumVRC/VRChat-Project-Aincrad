const path =
location.pathname
.split("/")
.pop()
.replace(".html","");

async function loadMonster(){

  const res =
  await fetch(
    `./attack/${path}.json`
  );

  const data =
  await res.json();

  document.querySelector("h1")
  .textContent=data.name;

  document.querySelector(
    ".detail-image"
  ).src=data.image;

  document.querySelectorAll(
    ".detail-stat"
  )[0].textContent=
  `Col : ${data.col}`;

  document.querySelectorAll(
    ".detail-stat"
  )[1].textContent=
  `EXP : ${data.exp}`;

  document.querySelector(
    ".drop-list"
  ).innerHTML=
  data.drops.map(
    d=>
    `<div class="drop-item">${d}</div>`
  ).join("");

  loadMaps(data.maps);
  loadAttacks(data.attacks);
}

function loadMaps(maps){

  const tabs=
  document.getElementById("map-tabs");

  const img=
  document.getElementById("map-image");

  tabs.innerHTML="";

  maps.forEach((map,i)=>{

    const btn=
    document.createElement("button");

    btn.textContent=
    map.label;

    btn.onclick=()=>{

      img.src=
      map.image;
    };

    if(i===0){
      img.src=
      map.image;
    }

    tabs.appendChild(btn);
  });
}

function loadAttacks(attacks){

  const container=
  document.getElementById(
    "attack-list"
  );

  container.innerHTML="";

  attacks.forEach(atk=>{

    const div=
    document.createElement("div");

    div.className=
    "attack-box";

    div.innerHTML=`

      <button class="attack-toggle">
        <span class="arrow">▶</span>
        ${atk.name}
      </button>

      <div class="attack-content">

        <video controls>
          <source src="${atk.video}">
        </video>

        <p>${atk.desc}</p>

      </div>
    `;

    const btn=
    div.querySelector(
      ".attack-toggle"
    );

    const content=
    div.querySelector(
      ".attack-content"
    );

    const arrow=
    div.querySelector(
      ".arrow"
    );

    btn.onclick=()=>{

      const open=
      content.classList.toggle(
        "open"
      );

      arrow.textContent=
      open ? "▼":"▶";
    };

    container.appendChild(div);
  });
}

loadMonster();
