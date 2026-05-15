const maps = [

{
name:"1階層",
image:"../detail/map/Frenzy boar/Frenzy Boar_floor1.png"
},

{
name:"ダンジョン",
image:"../detail/map/Frenzy boar/Frenzy Boar_dungeon.png"
},

{
name:"2階層",
image:"../detail/map/Frenzy boar/Frenzy Boar_floor2.png"
}

];

const attacks = [

{
name:"➤突進",
video:"../detail/attackvideo/Frenzy Boar/Frenzy Boar_attack1.mp4",
desc:"一直線に高速突進。横回避推奨"
},

{
name:"➤踏みつけ",
video:"../detail/attackvideo/Frenzy Boar/Frenzy Boar_attack2.mp4",
desc:"近距離高威力。後方回避"
}

];

const mapButtons =
document.getElementById("mapButtons");

const mapImage =
document.getElementById("mapImage");

maps.forEach((map,i)=>{

const btn=document.createElement("button");

btn.className="switch-btn";
btn.textContent=map.name;

if(i===0)btn.classList.add("active");

btn.onclick=()=>{

document
.querySelectorAll("#mapButtons .switch-btn")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

mapImage.src=map.image;

};

mapButtons.appendChild(btn);

});

const attackButtons =
document.getElementById("attackButtons");

const attackVideo =
document.getElementById("attackVideo");

const attackDesc =
document.getElementById("attackDesc");

function setAttack(data){

attackVideo.src=data.video;
attackDesc.textContent=data.desc;

}

attacks.forEach((atk,i)=>{

const btn=document.createElement("button");

btn.className="switch-btn";
btn.textContent=atk.name;

if(i===0){
btn.classList.add("active");
setAttack(atk);
}

btn.onclick=()=>{

document
.querySelectorAll("#attackButtons .switch-btn")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

setAttack(atk);

};

attackButtons.appendChild(btn);

});
