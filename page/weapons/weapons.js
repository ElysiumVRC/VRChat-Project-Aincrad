const weaponList =
  document.getElementById("weapon-list");

const searchInput =
  document.getElementById("weapon-search");

const tagContainer =
  document.getElementById("tag-container");

let weapons = [];

let activeTags = [];

/* =========================
   LOAD JSON
========================= */

fetch("weapons.json")
  .then(res => res.json())
  .then(data => {

    weapons = data;

    createTags();

    renderWeapons(weapons);

  });

/* =========================
   CREATE TAGS
========================= */

function createTags(){

  const tags = new Set();

  weapons.forEach(weapon => {

    weapon.tags.forEach(tag => {

      tags.add(tag);

    });

  });

  tags.forEach(tag => {

    const button =
      document.createElement("button");

    button.className = "tag";

    button.textContent = tag;

    button.onclick = () => {

      const index =
        activeTags.indexOf(tag);

      if(index >= 0){

        activeTags.splice(index,1);

        button.classList.remove("active");

      }else{

        activeTags.push(tag);

        button.classList.add("active");

      }

      filterWeapons();

    };

    tagContainer.appendChild(button);

  });

}

/* =========================
   RENDER
========================= */

function renderWeapons(data){

  weaponList.innerHTML = "";

  data.forEach(weapon => {

    weaponList.innerHTML += `

      <div class="weapon-card">

        <a
          class="weapon-name"
          href="${weapon.link}"
        >
          ${weapon.name}
        </a>

        <img
          class="weapon-image"
          src="${weapon.image}"
        >

        <div class="weapon-stat">
          Lv.${weapon.level}
        </div>

        <div class="weapon-stat">
          ${weapon.attack}
        </div>

        <div class="weapon-stat">
          ${weapon.buy} Col
        </div>

        <div class="weapon-stat">
          ${weapon.sell} Col
        </div>

        <div class="weapon-stat">
          ${weapon.type}
        </div>

      </div>

    `;

  });

}

/* =========================
   FILTER
========================= */

function filterWeapons(){

  const value =
    searchInput.value.toLowerCase();

  const filtered =
    weapons.filter(weapon => {

      const matchesSearch =

        weapon.name
          .toLowerCase()
          .includes(value);

      const matchesTag =

        activeTags.length === 0 ||

        activeTags.every(tag =>
          weapon.tags.includes(tag)
        );

      return (
        matchesSearch &&
        matchesTag
      );

    });

  renderWeapons(filtered);

}

/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
  "input",
  filterWeapons
);
