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

      /* =========================
         CLICK → PAGE MOVE
      ========================= */

      point.onclick = () => {

        // 相対パスで移動
        window.location.href =
          `map/${m.path}`;

      };

      /* hover tooltip代わり */
      point.title = m.name;

      mapView.appendChild(point);

    });

}
