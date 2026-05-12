const mapView = document.getElementById("map-view");
const mapInfo = document.getElementById("map-info");
const search = document.getElementById("map-search");
const categoryBox = document.getElementById("map-category");

let maps = [];
let activeCategory = "all";

/* ========================= LOAD ========================= */

fetch("map.json")
  .then(res => res.json())
  .then(data => {

    maps = data;

    createCategoryUI();
    renderMapPoints();

  });

/* ========================= CATEGORY UI ========================= */

function createCategoryUI(){

  const categories = ["all","region","city","dungeon"];

  categories.forEach(cat => {

    const btn = document.createElement("button");

    btn.className = "area-btn";
    btn.textContent = cat;

    btn.onclick = () => {

      activeCategory = cat;

      document.querySelectorAll(".area-btn")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      renderMapPoints();

    };

    categoryBox.appendChild(btn);

  });

}

/* ========================= RENDER MAP ========================= */

function renderMapPoints(){

  mapView.innerHTML = "";

  const keyword = search.value.toLowerCase();

  maps
    .filter(m => {

      const matchCategory =
        activeCategory === "all" || m.category === activeCategory;

      const matchSearch =
        m.name.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;

    })
    .forEach(m => {

      const point = document.createElement("div");

      point.className = "map-point";

      point.style.left = m.x + "%";
      point.style.top = m.y + "%";

      point.onclick = () => {

        mapInfo.innerHTML = `

          <h3>${m.name}</h3>
          <p>${m.description}</p>

        `;

      };

      mapView.appendChild(point);

    });

}

/* ========================= SEARCH ========================= */

search.addEventListener("input", renderMapPoints);
