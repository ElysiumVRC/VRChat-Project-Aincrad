const weaponList =
  document.getElementById("weapon-list");

const searchInput =
  document.getElementById("weapon-search");

const tagContainer =
  document.getElementById("tag-container");

let weapons = [];

let activeFilters = {};

/* =========================
   LOAD JSON
========================= */

fetch("weapons.json")
  .then(res => res.json())
  .then(data => {

    weapons = data;

    createCategoryTags();

    renderWeapons(weapons);

  });

/* =========================
   CATEGORY TAGS
========================= */

function createCategoryTags(){

  const categories = {};

  weapons.forEach(weapon => {

    Object.entries(
      weapon.categories
    ).forEach(([category,value]) => {

      if(!categories[category]){

        categories[category] = new Set();

      }

      categories[category].add(value);

    });

  });

  Object.entries(categories)
    .forEach(([category,values]) => {

      const section =
        document.createElement("div");

      section.className =
        "tag-section";

      section.innerHTML = `

        <h3 class="tag-title">
          ${category}
        </h3>

        <div class="tag-group"></div>

      `;

      const group =
        section.querySelector(".tag-group");

      values.forEach(value => {

        const button =
          document.createElement("button");

        button.className = "tag";

        button.textContent = value;

        button.onclick = () => {

          if(
            activeFilters[category] === value
          ){

            delete activeFilters[category];

            button.classList.remove("active");

          }else{

            activeFilters[category] = value;

          }

          section
            .querySelectorAll(".tag")
            .forEach(tag => {

              tag.classList.remove("active");

            });

          if(
            activeFilters[category] === value
          ){

            button.classList.add("active");

          }

          filterWeapons();

        };

        group.appendChild(button);

      });

      tagContainer.appendChild(section);

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

      const matchesCategory =

        Object.entries(activeFilters)
          .every(([category,value]) => {

            return (
              weapon.categories[category]
              === value
            );

          });

      return (
        matchesSearch &&
        matchesCategory
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
