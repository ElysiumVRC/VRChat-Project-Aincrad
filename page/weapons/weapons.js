const weaponList =
  document.getElementById("weapon-list");

const searchInput =
  document.getElementById("weapon-search");

const tagContainer =
  document.getElementById("tag-container");

let weapons = [];

/* =========================
   MULTI FILTER
========================= */

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

      /* 配列対応 */

      if(Array.isArray(value)){

        value.forEach(v => {

          categories[category].add(v);

        });

      }else{

        categories[category].add(value);

      }

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

          /* category 初期化 */

          if(!activeFilters[category]){

            activeFilters[category] = [];

          }

          /* ON/OFF */

          if(
            activeFilters[category]
              .includes(value)
          ){

            activeFilters[category] =
              activeFilters[category]
                .filter(v => v !== value);

            button.classList.remove(
              "active"
            );

          }else{

            activeFilters[category]
              .push(value);

            button.classList.add(
              "active"
            );

          }

          /* 空なら削除 */

          if(
            activeFilters[category]
              .length === 0
          ){

            delete activeFilters[
              category
            ];

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

  weaponList.innerHTML = `

    <div class="weapon-header">

      <div>
        武器名
      </div>

      <div>
        レベル
      </div>

      <div>
        攻撃力
      </div>

      <div>
        買値
      </div>

      <div>
        売値
      </div>

      <div>
        攻撃方法
      </div>

    </div>

  `;

  data.forEach(weapon => {

    weaponList.innerHTML += `

      <div class="weapon-card">

        <div class="weapon-name-area">

          <img
            class="weapon-image"
            src="${weapon.image}"
            alt="${weapon.name}"
          >

          <a
            class="weapon-name"
            href="${weapon.link}"
          >
            ${weapon.name}
          </a>

        </div>

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

      /* SEARCH */

      const matchesSearch =

        weapon.name
          .toLowerCase()
          .includes(value);

      /* CATEGORY */

      const matchesCategory =

        Object.entries(activeFilters)
          .every(([category,values]) => {

            const weaponValue =
              weapon.categories[
                category
              ];

            /* weapon側が配列 */

            if(
              Array.isArray(weaponValue)
            ){

              return values.some(v =>
                weaponValue.includes(v)
              );

            }

            /* weapon側が単体 */

            return values.includes(
              weaponValue
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
