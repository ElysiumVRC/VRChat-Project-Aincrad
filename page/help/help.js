const faqList =
  document.getElementById("faq-list");

const searchInput =
  document.getElementById("help-search");

let faqs = [];

/* =========================
   LOAD JSON
========================= */

fetch("help.json")
  .then(res => res.json())
  .then(data => {

    faqs = data;

    renderFAQ(faqs);

  })

  .catch(error => {

    faqList.innerHTML = `

      <div class="faq-error">
        help.json の読み込みに失敗しました
      </div>

    `;

    console.error(error);

  });

/* =========================
   RENDER FAQ
========================= */

function renderFAQ(data){

  faqList.innerHTML = "";

  if(data.length === 0){

    faqList.innerHTML = `

      <div class="faq-empty">
        一致する質問がありません
      </div>

    `;

    return;

  }

  data.forEach(faq => {

    let mediaHTML = "";

    if(faq.image){

      mediaHTML += `

        <img
          class="faq-image"
          src="${faq.image}"
          alt="${faq.question}"
        >

      `;

    }

    if(faq.video){

      mediaHTML += `

        <video
          class="faq-video"
          controls
          preload="metadata"
        >

          <source
            src="${faq.video}"
            type="video/mp4"
          >

        </video>

      `;

    }

    faqList.innerHTML += `

      <div class="faq-item">

        <button class="faq-question">

          <span class="faq-arrow">➤</span>

          <span class="faq-question-text">
            ${faq.question}
          </span>

        </button>

        <div class="faq-answer">

          <div class="faq-answer-text">
            ${faq.answer}
          </div>

          ${mediaHTML}

        </div>

      </div>

    `;

  });

  addToggleEvents();

}

/* =========================
   TOGGLE
========================= */

function addToggleEvents(){

  const items =
    document.querySelectorAll(".faq-item");

  items.forEach(item => {

    const button =
      item.querySelector(".faq-question");

    button.onclick = () => {

      item.classList.toggle("active");

    };

  });

}

/* =========================
   FILTER (question only)
========================= */

function filterFAQ(){

  const value =
    searchInput.value.toLowerCase();

  const filtered =
    faqs.filter(faq => {

      return faq.question
        .toLowerCase()
        .includes(value);

    });

  renderFAQ(filtered);

}

/* =========================
   SEARCH EVENT
========================= */

searchInput.addEventListener(
  "input",
  filterFAQ
);
