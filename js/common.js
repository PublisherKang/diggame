let score = 0; 
let outOfTime = false;
let num = 0.01

const items = document.querySelectorAll(".stone_item");

var startTime

const clicksTxt = document.getElementById("clicks");
const gameContainer = document.querySelector(".game_container")

//클릭하면 초당 클릭 스피드 올라감
startGame();

function startGame() {
    startTime = new Date().getTime();
    
    setInterval(function() {
    var total = (new Date().getTime() - startTime) / 100000;
    // console.log(total);
    clicksTxt.textContent = (score / total).toFixed(2);
        
    }, 1);
}


//클릭하면 게임 스코어 올라감
for(let i = 0; i < items.length; i++){
    items[i].addEventListener("click", function(e) {
        if (!outOfTime) {
        score += num;
        document.getElementById("point_score").textContent = score.toFixed(2);
        }
    });
}


//200% 부스트 시간 다 되면 없어지게
const boost200 = document.querySelector(".boost_200");

boostTimeOut();
function boostTimeOut(){
    const gauge = document.querySelector(".gauge");
    // console.log(gauge);

    gauge.addEventListener("animationend", function(){
        boost200.style.display = "none";
    });

}

// 부스트 아이템 사용
boost200Start();
function boost200Start(){
    const boostItem = document.querySelector(".boost_item");
    boostItem.addEventListener("click", function(){
        boost200.style.display = "block";
        this.style.display = "none";
    });
}


const cursorTarget = document.querySelectorAll(".stone_item img");
for(let i = 0; i < cursorTarget.length; i++){
    function hideCur(event){
        cursorTarget[i].classList.add("cur3");
        event.preventDefault();
    }
    function moveCur(event){
        cursorTarget[i].classList.remove("cur3");
    }
    function showCur(event){
        cursorTarget[i].classList.remove("cur3");
        event.preventDefault();
    }
    
    cursorTarget[i].onmousedown = hideCur;
    cursorTarget[i].onmousemove = moveCur;
    cursorTarget[i].onmouseup  = showCur;
    
}


// 메뉴 버튼 클릭시 메인 메뉴 팝업
const menuBtn = document.querySelector(".menu_btn");
const mainMenu = document.querySelector(".main_menu");
menuBtn.addEventListener("click", function(e){
    e.preventDefault();
    mainMenu.style.display = "block";
});

gameContainer.addEventListener("click", function(){
    mainMenu.style.display = "none";
});




const gaugeWrap = document.querySelector(".gauge_wrap");
const gauge = document.querySelector(".gauge");

let width = 230
let interval = setInterval(widthMinus, 100);

function widthMinus(){
    if(width <= 0){
        clearInterval(interval);
        width = 230;
    }else{
        width--;
        gauge.style.width = 1;
    }
}

widthMinus();



// function drag_handler(ev){
//     console.log("Drag");
// }

// function dragstart_handler(ev) {
//     console.log("dragStart");
//     ev.dataTransfer.setData("text", ev.target.id);
// }

// function dragover_handler(ev) {
//     console.log("dragOver");
//     ev.preventDefault();
// }
   
// function drop_handler(ev) {
//     console.log("Drop");
//     ev.currentTarget.style.background = "lightyellow";
   
//     ev.preventDefault();
//     let data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }

// let dragItem = document.getElementById("b1");

// dragItem.addEventListener("touchmove", handleMove);
// dragItem.addEventListener("touchend", handleEnd);

// function handleMove(ev){
//     ev.dataTransfer.setData("text", ev.target.id);
// }
// function handleEnd(ev){
//     let data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));   
// }



