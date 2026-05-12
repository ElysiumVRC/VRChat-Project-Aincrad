let quests = [];
let selectedTag = null;

fetch("quests.json")
  .then(res => res.json())
  .then(data => {
    quests = data;
    renderTags();
    renderQuests();
  });

// タグ生成
function renderTags() {
  const tagBox = document.getElementById("tags");

  const tags = [...new Set(quests.flatMap(q => q.tags))];

  tags.forEach(tag => {
    const el = document.createElement("span");
    el.className = "tag";
    el.innerText = tag;

    el.onclick = () => {
      selectedTag = selectedTag === tag ? null : tag;

      document.querySelectorAll(".tag").forEach(t => {
        t.classList.remove("active");
      });

      if (selectedTag === tag) {
        el.classList.add("active");
      }

      renderQuests();
    };

    tagBox.appendChild(el);
  });
}

// クエスト描画
function renderQuests() {
  const list = document.getElementById("questList");
  const search = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  quests
    .filter(q => {
      const matchName = q.name.toLowerCase().includes(search);
      const matchTag = selectedTag ? q.tags.includes(selectedTag) : true;
      return matchName && matchTag;
    })
    .forEach(q => {
      const div = document.createElement("div");
      div.className = "quest";

      div.innerHTML = `
        <img src="${q.image}">
        <div class="quest-content">
          <h3>${q.name}</h3>
          <div class="stats">
            💰 Col: ${q.col} | EXP: ${q.exp} | GuildEXP: ${q.guildExp} | ⏱ ${q.timeLimit}
          </div>
        </div>
      `;

      // クリックで別HTMLへ
      div.onclick = () => {
        window.location.href = q.page;
      };

      list.appendChild(div);
    });
}

// 検索
document.addEventListener("input", e => {
  if (e.target.id === "search") {
    renderQuests();
  }
});
