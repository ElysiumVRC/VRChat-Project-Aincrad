/* ===== BUTTON CREATE ===== */

const button =
  document.createElement("button");

button.id = "theme-toggle";

document.body.appendChild(button);

/* ===== APPLY ===== */

function applyTheme(theme){

  if(theme === "light"){

    document.body.classList.add("light");

    button.textContent = "☀";

  }else{

    document.body.classList.remove("light");

    button.textContent = "🌙";

  }

}

/* ===== LOAD ===== */

const savedTheme =
  localStorage.getItem("theme");

/* ===== OS DETECT ===== */

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

/* ===== CLICK ===== */

button.onclick = () => {

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

/* ===== PAGE/TAB SYNC ===== */

window.addEventListener(
  "storage",
  (event)=>{

    if(event.key === "theme"){

      applyTheme(event.newValue);

    }

  }
);
