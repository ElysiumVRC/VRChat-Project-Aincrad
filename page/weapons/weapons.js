const weaponList =
  document.getElementById("weapon-list");

const searchInput =
  document.getElementById("weapon-search");

const tagContainer =
  document.getElementById("tag-container");

let weapons = [];

let activeTag = null;

fetch("weapons.json")
  .then(res => res.json())
  .then(data => {

    weapons = data;

    createTags();
    renderWeapons(data);

  });

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

      if(activeTag === tag){

        activeTag = null;

        document
          .querySelectorAll(".tag")
          .forEach(t => t.classList.remove("active"));

      }else{

        activeTag = tag;

        document
          .querySelectorAll(".tag")
          .forEach(t => t.classList.remove("active"));

        button.classList.add("active");

      }

      filterWeapons();

    };

    tagContainer.appendChild(button);

  });

}

function renderWeapons(data){

  weaponList.innerHTML = "";

  data.forEach(weapon => {

    weaponList.innerHTML += `

      <div class="weapon-card">

        <a class="weapon-name" href="${weapon.link}">
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

function filterWeapons(){

  const value =
    searchInput.value.toLowerCase();

  let filtered = weapons.filter(weapon => {

    const matchesSearch =
      weapon.name.toLowerCase().includes(value);

    const matchesTag =
      !activeTag ||
      weapon.tags.includes(activeTag);

    return matchesSearch && matchesTag;

  });

  renderWeapons(filtered);

}

searchInput.addEventListener(
  "input",
  filterWeapons
);
