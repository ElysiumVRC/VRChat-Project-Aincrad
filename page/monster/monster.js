const monsterList = document.getElementById("monsterList");
const searchInput = document.getElementById("search");
const tagsContainer = document.getElementById("tags");

let monsters = [];
let selectedTag = "All";

async function loadMonsters(){

  const response = await fetch("./monster.json");

  monsters = await response.json();

  createTags();
  renderMonsters();

}

function createTags(){

  const allTags = [
    "All",
    ...new Set(monsters.flatMap(m => m.tags))
  ];

  tagsContainer.innerHTML = "";

  allTags.forEach(tag => {

    const btn = document.createElement("button");

    btn.className = "tag";
    btn.textContent = tag;

    if(tag === selectedTag){
      btn.classList.add("active");
    }

    btn.onclick = () => {

      selectedTag = tag;

      document.querySelectorAll(".tag")
        .forEach(t => t.classList.remove("active"));

      btn.classList.add("active");

      renderMonsters();

    };

    tagsContainer.appendChild(btn);

  });

}

function renderMonsters(){

  const search = searchInput.value.toLowerCase();

  monsterList.innerHTML = "";

  const filtered = monsters.filter(monster => {

    const matchSearch =
      monster.name.toLowerCase().includes(search);

    const matchTag =
      selectedTag === "All" ||
      monster.tags.includes(selectedTag);

    return matchSearch && matchTag;

  });

  filtered.forEach(monster => {

    const card = document.createElement("a");

    card.className = "monster-card";

    card.href = monster.link;

    card.innerHTML = `
      <img class="monster-image" src="${monster.image}">

      <div class="monster-content">

        <div class="monster-name">
          ${monster.name}
        </div>

        <div class="monster-stat">
          Col : ${monster.col}
        </div>

        <div class="monster-stat">
          EXP : ${monster.exp}
        </div>

        <div class="drop-list">
          ${monster.drops.map(drop =>
            `<div class="drop-item">${drop}</div>`
          ).join("")}
        </div>

      </div>
    `;

    monsterList.appendChild(card);

  });

}

searchInput.addEventListener("input", renderMonsters);

loadMonsters();
