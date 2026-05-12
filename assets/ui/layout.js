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
      <i data-lucide="house"></i>
      トップページ
    </a>

    <a href="../maps/maps.html">
      <i data-lucide="map"></i>
      マップ
    </a>

    <a href="../weapons/weapons.html">
      <i data-lucide="sword"></i>
      武器
    </a>

    <a href="../items/items.html">
      <i data-lucide="backpack"></i>
      アイテム
    </a>

    <a href="../monster/items.html">
      <i data-lucide="panda"></i>
      モンスター
    </a>

    <a href="../quest/items.html">
      <i data-lucide="file-text"></i>
      クエスト
    </a>

    <a href="../help/help.html">
    <i data-lucide="circle-help"></i>
    ヘルプ
    </a>

  </nav>

</div>

<div class="topbar-right">

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

/* ===== LUCIDE ===== */

lucide.createIcons();
