function toggle(el){
    const content =
    el.nextElementSibling;

    content.style.display =
    content.style.display === "block"
    ? "none"
    : "block";
}

function changeMap(map){

    const box =
    document.getElementById("mapBox");

    if(map){
        box.innerHTML =
        `<img src="${map}">`;
    }else{
        box.innerHTML =
        "マップが存在しません";
    }
}
