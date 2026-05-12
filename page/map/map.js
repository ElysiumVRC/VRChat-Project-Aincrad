const areaList = document.getElementById("area-list");
const search = document.getElementById("map-search");

const title = document.getElementById("area-title");
const desc = document.getElementById("area-desc");

const mapImage = document.getElementById("map-image");
const points = document.getElementById("map-points");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");

document.getElementById("popup-close")
  .onclick = () => popup.classList.add("hidden");

let data = [];
let currentArea = null;

/* ================= LOAD ================= */

fetch("map.json")
  .then(r => r.json())
  .then(json => {
    data = json;
    renderAreas(data);
  });

/* ================= AREAS ================= */

function renderAreas(list){

  areaList.innerHTML = "";

  list.forEach(area => {

    const btn = document.createElement("button");
    btn.className = "area-btn";
    btn.textContent = area.name;

    btn.onclick = () => {
      selectArea(area);
    };

    areaList.appendChild(btn);

  });

}

/* ================= SELECT AREA ================= */

function selectArea(area){

  currentArea = area;

  title.textContent = area.name;
  desc.textContent = area.description;

  mapImage.src = area.image;

  renderPoints(area.points);

}

/* ================= POINTS ================= */

function renderPoints(list){

  points.innerHTML = "";

  list.forEach(p => {

    const el = document.createElement("div");

    el.className = "point";
    el.style.left = p.x + "%";
    el.style.top = p.y + "%";

    el.onclick = () => {

      popupTitle.textContent = p.name;
      popupText.textContent = p.text;

      popup.classList.remove("hidden");

    };

    points.appendChild(el);

  });

}

/* ================= SEARCH ================= */

search.addEventListener("input", () => {

  const v = search.value.toLowerCase();

  document.querySelectorAll(".area-btn")
    .forEach(btn => {

      btn.style.display =
        btn.textContent.toLowerCase().includes(v)
        ? ""
        : "none";

    });

});
