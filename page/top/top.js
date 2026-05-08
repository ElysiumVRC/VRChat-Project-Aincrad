const themeBtn =
  document.getElementById("theme-toggle");

/* ===== APPLY THEME ===== */

function applyTheme(theme){

  if(theme === "light"){

    document.body.classList.add("light");

    themeBtn.textContent = "☀";

  }else{

    document.body.classList.remove("light");

    themeBtn.textContent = "🌙";

  }

}

/* ===== SAVED ===== */

const savedTheme =
  localStorage.getItem("theme");

/* ===== AUTO OS DETECT ===== */

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

/* ===== BUTTON ===== */

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

/* ===== TAB SYNC ===== */

window.addEventListener(
  "storage",
  (event)=>{

    if(event.key === "theme"){

      applyTheme(event.newValue);

    }

  }
);
