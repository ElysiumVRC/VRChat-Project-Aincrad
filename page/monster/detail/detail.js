const params =
new URLSearchParams(
  window.location.search
);

const monsterName =
params.get("monster");

if(!monsterName){

  document.body.innerHTML =
  "<h1>モンスターが指定されていません</h1>";

  throw new Error();
}

fetch(`./attack/${monsterName}.json`)
.then(res=>res.json())
.then(data=>{

  renderMonster(data);

});

function renderMonster(data){

  document.querySelector("h1")
  .textContent = data.name;

  document.querySelector(".detail-image")
  .src = data.image;

  document.querySelectorAll(
    ".detail-stat"
  )[0].textContent =
  `Col : ${data.stats.col}`;

  document.querySelectorAll(
    ".detail-stat"
  )[1].textContent =
  `EXP : ${data.stats.exp}`;

  /* ===== DROP ===== */

  const dropList =
  document.querySelector(
    ".drop-list"
  );

  dropList.innerHTML = "";

  data.drops.forEach(drop=>{

    dropList.innerHTML += `
      <div class="drop-item">
        ${drop}
      </div>
    `;

  });

  /* ===== MAP ===== */

  const mapButtons =
  document.getElementById(
    "map-buttons"
  );

  const mapImage =
  document.getElementById(
    "map-image"
  );

  mapButtons.innerHTML = "";

  data.maps.forEach(map=>{

    const btn =
    document.createElement(
      "button"
    );

    btn.className =
    "map-btn";

    btn.textContent =
    map.label;

    btn.onclick=()=>{

      mapImage.src =
      map.image;

      document
      .querySelectorAll(
        ".map-btn"
      )
      .forEach(b=>
        b.classList.remove(
          "active"
        )
      );

      btn.classList.add(
        "active"
      );

    };

    if(
      map.id ===
      data.defaultMap
    ){

      btn.classList.add(
        "active"
      );

      mapImage.src =
      map.image;

    }

    mapButtons
    .appendChild(btn);

  });

  /* ===== ATTACK ===== */

  const attackList =
  document.getElementById(
    "attack-list"
  );

  attackList.innerHTML = "";

  data.attacks.forEach(
  attack=>{

    const item =
    document.createElement(
      "div"
    );

    item.className =
    "attack-item";

    item.innerHTML = `

      <button
        class="attack-btn"
      >

        <span class="arrow">
          ➤
        </span>

        ${attack.title}

      </button>

      <div
        class="attack-content"
      >

        <video
          controls
          preload="metadata"
        >
          <source
            src="${attack.video}"
            type="video/mp4"
          >
        </video>

        <p>
          ${attack.description}
        </p>

      </div>
    `;

    const btn =
    item.querySelector(
      ".attack-btn"
    );

    const content =
    item.querySelector(
      ".attack-content"
    );

    const arrow =
    item.querySelector(
      ".arrow"
    );

    btn.onclick=()=>{

      const open =
      content.classList
      .contains("open");

      content.classList
      .toggle("open");

      arrow.textContent =
      open
      ? "➤"
      : "▼";

    };

    attackList
    .appendChild(item);

  });

  lucide.createIcons();

}
