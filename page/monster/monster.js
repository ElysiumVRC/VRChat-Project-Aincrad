const monsterList = document.getElementById("monsterList");
const searchInput = document.getElementById("search");
const tagsContainer = document.getElementById("tags");

let monsters = [];

let selectedTags = {

  difficulty: "All",
  type: "All",
  floor: "All"

};

async function loadMonsters(){

  const response = await fetch("./monster.json");

  monsters = await response.json();

  createTags();

  renderMonsters();

}

function createTags(){

  tagsContainer.innerHTML = "";

  const categories = {

    difficulty: "難易度",
    type: "種類",
    floor: "階層"

  };

  for(const category in categories){

    const section = document.createElement("div");

    section.className = "tag-section";

    const title = document.createElement("h3");

    title.textContent = categories[category];

    section.appendChild(title);

    const row = document.createElement("div");

    row.className = "tag-row";

    const values = [

      "All",

      ...new Set(
        monsters.map(m => m.tags[category])
      )

    ];

    values.forEach(value => {

      const btn = document.createElement("button");

      btn.className = "tag";

      btn.textContent = value;

      if(selectedTags[category] === value){

        btn.classList.add("active");

      }

      btn.onclick = () => {

        selectedTags[category] = value;

        createTags();

        renderMonsters();

      };

      row.appendChild(btn);

    });

    section.appendChild(row);

    tagsContainer.appendChild(section);

  }

}

function renderMonsters(){

  const search = searchInput.value.toLowerCase();

  monsterList.innerHTML = "";

  const filtered = monsters.filter(monster => {

    const matchSearch =
      monster.name.toLowerCase().includes(search);

    const matchDifficulty =

      selectedTags.difficulty === "All" ||

      monster.tags.difficulty ===
      selectedTags.difficulty;

    const matchType =

      selectedTags.type === "All" ||

      monster.tags.type ===
      selectedTags.type;

    const matchFloor =

      selectedTags.floor === "All" ||

      monster.tags.floor ===
      selectedTags.floor;

    return (

      matchSearch &&
      matchDifficulty &&
      matchType &&
      matchFloor

    );

  });

  filtered.forEach(monster => {

    const card = document.createElement("a");

    card.className = "monster-card";

    card.href = monster.link;

    card.innerHTML = `

      <img
        class="monster-image"
        src="${monster.image}"
        alt="${monster.name}"
      >

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

        <div class="drop-title">

          Item Drop

        </div>

        <div class="drop-list">

          ${monster.drops.map(drop => `

            <div class="drop-item">

              ${drop}

            </div>

          `).join("")}

        </div>

      </div>

    `;

    monsterList.appendChild(card);

  });

}

searchInput.addEventListener(
  "input",
  renderMonsters
);

loadMonsters();
