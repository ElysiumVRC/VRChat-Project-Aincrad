const itemList =
document.getElementById("item-list");

const searchInput =
document.getElementById("item-search");

const tagContainer =
document.getElementById("tag-container");

let items = [];
let activeFilters = {};

fetch("item.json")
.then(res=>res.json())
.then(data=>{

  items=data;

  createCategoryTags();
  renderItems(items);

});

function createCategoryTags(){

  const categories={};

  items.forEach(item=>{

    Object.entries(item.categories)
    .forEach(([category,value])=>{

      if(!categories[category]){

        categories[category]=new Set();

      }

      if(Array.isArray(value)){

        value.forEach(v=>
          categories[category].add(v)
        );

      }else{

        categories[category].add(value);

      }

    });

  });

  Object.entries(categories)
  .forEach(([category,values])=>{

    const section =
    document.createElement("div");

    section.innerHTML=
    `<h3>${category}</h3>
    <div class="tag-group"></div>`;

    const group=
    section.querySelector(".tag-group");

    values.forEach(value=>{

      const button=
      document.createElement("button");

      button.className="tag";
      button.textContent=value;

      button.onclick=()=>{

        if(!activeFilters[category]){

          activeFilters[category]=[];

        }

        if(
          activeFilters[category]
          .includes(value)
        ){

          activeFilters[category]=
          activeFilters[category]
          .filter(v=>v!==value);

          button.classList.remove("active");

        }else{

          activeFilters[category]
          .push(value);

          button.classList.add("active");

        }

        filterItems();

      };

      group.appendChild(button);

    });

    tagContainer.appendChild(section);

  });

}

function renderItems(data){

  itemList.innerHTML=`

  <div class="item-header">

    <div>アイテム名</div>
    <div>種類</div>
    <div>買値</div>
    <div>売値</div>
    <div>入手</div>

  </div>
  `;

  data.forEach(item=>{

    itemList.innerHTML+=`

    <div class="item-card">

      <div class="item-name-area">

        <img
        class="item-image"
        src="${item.image}">

        <a
        class="item-name"
        href="${item.link}">
        ${item.name}
        </a>

      </div>

      <div class="item-stat">
        ${item.type}
      </div>

      <div class="item-stat">
        ${item.buy} Col
      </div>

      <div class="item-stat">
        ${item.sell} Col
      </div>

      <div class="item-stat">
        ${item.obtain}
      </div>

    </div>
    `;

  });

}

function filterItems(){

  const value=
  searchInput.value.toLowerCase();

  const filtered=
  items.filter(item=>{

    const matchesSearch=
    item.name
    .toLowerCase()
    .includes(value);

    const matchesCategory=
    Object.entries(activeFilters)
    .every(([category,values])=>{

      const itemValue=
      item.categories[category];

      if(
        Array.isArray(itemValue)
      ){

        return values.some(v=>
          itemValue.includes(v)
        );

      }

      return values.includes(
        itemValue
      );

    });

    return(
      matchesSearch &&
      matchesCategory
    );

  });

  renderItems(filtered);

}

searchInput.addEventListener(
"input",
filterItems
);
