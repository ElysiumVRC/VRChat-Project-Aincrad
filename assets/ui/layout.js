/* ===== CREATE NAVBAR ===== */

const navbar = document.createElement("header");

navbar.className = "topbar";

navbar.innerHTML = `

<div class="topbar-left">

  <div class="logo">
    Project Aincrad
  </div>

  <nav class="nav-links">

    <a href="/VRChat-Project-Aincrad/page/top/top.html">
      <i data-lucide="house"></i>
      トップページ
    </a>

    <a href="/VRChat-Project-Aincrad/page/kihon/kihon.html">
      <i data-lucide="book-type"></i>
      基本操作
    </a>

    <a href="/VRChat-Project-Aincrad/page/map/map.html">
      <i data-lucide="map"></i>
      マップ
    </a>

    <a href="/VRChat-Project-Aincrad/page/weapons/weapons.html">
      <i data-lucide="sword"></i>
      武器
    </a>

    <a href="/VRChat-Project-Aincrad/page/item/item.html">
      <i data-lucide="backpack"></i>
      アイテム
    </a>

    <a href="/VRChat-Project-Aincrad/page/monster/monster.html">
      <i data-lucide="panda"></i>
      モンスター
    </a>

    <a href="/VRChat-Project-Aincrad/page/quest/quest.html">
      <i data-lucide="file-text"></i>
      クエスト
    </a>

    <a href="/VRChat-Project-Aincrad/page/help/help.html">
      <i data-lucide="circle-question-mark"></i>
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
