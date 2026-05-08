/* ===== CREATE NAVBAR ===== */

const navbar = document.createElement("header");

navbar.className = "topbar";

navbar.innerHTML = `

<div class="topbar-left">

  <div class="logo">
    Project Aincrad
  </div>

  <nav class="nav-links">

    <a href="../top/top.html">
      トップページ
    </a>

    <a href="../maps/maps.html">
      マップ
    </a>

    <a href="../weapons/weapons.html">
      武器
    </a>

    <a href="../items/items.html">
      アイテム
    </a>

  </nav>

</div>

<div class="topbar-right">

  <input
    type="text"
    id="search-bar"
    placeholder="検索..."
  >

  <button id="theme-toggle">
    🌙
  </button>

</div>

`;

document.body.prepend(navbar);

/* ===== THEME ===== */

const themeBtn =
  document.getElementById("theme-toggle");

function applyTheme(theme){

  if(theme === "light"){

    document.body.classList.add("light");

    themeBtn.textContent = "☀";

  }else{

    document.body.classList.remove("light");

    themeBtn.textContent = "🌙";

  }

}

const savedTheme =
  localStorage.getItem("theme");

if(savedTheme){

  applyTheme(savedTheme);

}else{

  const prefersLight =
    window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

  applyTheme(
    prefersLight ? "light" : "dark"
  );

}

themeBtn.onclick = () => {

  const isLight =
    document.body.classList.contains("light");

  const nextTheme =
    isLight ? "dark" : "light";

  applyTheme(nextTheme);

  localStorage.setItem(
    "theme",
    nextTheme
  );

};

window.addEventListener(
  "storage",
  (event)=>{

    if(event.key === "theme"){

      applyTheme(event.newValue);

    }

  }
);

/* ===== SEARCH ===== */

const searchBar =
  document.getElementById("search-bar");

searchBar.addEventListener("input",()=>{

  const value =
    searchBar.value.toLowerCase();

  const searchable =
    document.querySelectorAll("[data-search]");

  searchable.forEach(item=>{

    const text =
      item.dataset.search.toLowerCase();

    if(text.includes(value)){

      item.style.display = "";

    }else{

      item.style.display = "none";

    }

  });

});
