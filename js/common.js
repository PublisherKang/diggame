let score = 0;
let outOfTime = false;
let numInit = 0.00;
let num = 0.01;

const items = document.querySelectorAll(".stone_item");

var startTime

const clicksTxt = document.getElementById("clicks");
const gameContainer = document.querySelector(".game_container");

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

const pointScore = document.getElementById("point_score");
const invenPointScore = document.getElementById("inven_point_score");
const shopPointScore = document.getElementById("shop_point_score");
const rankScore = document.getElementById("rank_score");

pointScore.textContent = numInit;
invenPointScore.textContent = numInit;
shopPointScore.textContent = numInit;
rankScore.textContent = numInit;

//클릭하면 게임 스코어 올라감
for(let i = 0; i < items.length; i++){
    items[i].addEventListener("click", function(e) {
        e.preventDefault();
        
        if (!outOfTime) {
        score += num;

        pointScore.textContent = score.toFixed(2);
        invenPointScore.textContent = score.toFixed(2);
        shopPointScore.textContent = score.toFixed(2);
        rankScore.textContent = score.toFixed(2);
        }

        //스코어 애니메이션
        let newSpan = document.createElement("span");
        // const stornImgs = document.querySelectorAll(".stone_item img");

        newSpan.textContent = num;
        newSpan.classList.add("ani_num");
        
        this.appendChild(newSpan);
        
        newSpan.addEventListener("animationend",function(){
            this.remove();
        });

    });
    
}

//실버 버튼 구매
const silverBuyBtn = document.getElementById("sliver_buy_btn");
silverBuyBtn.addEventListener("click", function(){
    const silverPop = document.getElementById("silver_pop");
    let silverPrice = 5000;    

    //실버 버튼 구매 성공
    if(score >= silverPrice){
        silverPop.style.visibility = "hidden";
        alert("구매에 성공했습니다.");
    }
    //가격부족 구매 실패
    else{
        silverPop.style.visibility = "hidden";
        alert("구매에 실패했습니다.");
    }
});



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

//게이지 바
const gaugeWrap = document.querySelector(".gauge_wrap");
const gauge = document.querySelector(".gauge");

let width = 230
let interval = setInterval(widthMinus, 100);

widthMinus();
function widthMinus(){
    if(width <= 0){
        clearInterval(interval);
        width = 230;
    }else{
        width--;
        gauge.style.width = 1;
    }
}

//사운드 버튼
soundOn();
function soundOn(){
    const audioBtn = document.querySelector(".audio_btn");
    const audio = document.querySelector(".audio");
    audioBtn.addEventListener("click", function(){
        this.classList.toggle("off");
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
    });
}

//오픈씨 바로가기
openseaOpen();
function openseaOpen(){
    const openseaBtn = document.querySelector(".opensea_btn");
    openseaBtn.addEventListener("click", function(ev){
        ev.preventDefault()
        window.open("https://opensea.io/");
    });
}

//방 이동시 랜덤 이미지 만들기
changeRoom();
function changeRoom(){
    const changeRoomBtn = document.getElementById("change_room_btn");
    const anotherRoomPop = document.querySelector(".another_room_popup");
    const gameWrap = document.querySelector(".game_wrap");
    const imgNumber = 7;
    
    changeRoomBtn.addEventListener("click", function(ev){
        ev.preventDefault();
        
        let randomImg = Math.floor(Math.random() * imgNumber);

        //팝업 끄기
        anotherRoomPop.style.visibility = "hidden";
        
        setTimeout(function(){
            gameWrap.style.backgroundImage = `url('images/background/back${randomImg + 1}.jpg')`;
        }, 1200);
        
        
        //애니메이션 추가
        gameWrap.classList.add("ani");
        //이벤트 실행동안 전체 클릭 금지
        gameWrap.classList.add("point_none");
        setTimeout(function(){
            gameWrap.classList.remove("ani");
            gameWrap.classList.remove("point_none");
        },3000);
        
        
       
        
    });
}






// 인벤토리 아이템 선택



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


// 마우스 망치 애니메이션
// const cursorTarget = document.querySelectorAll(".stone_item img");
// for(let i = 0; i < cursorTarget.length; i++){
//     function hideCur(event){
//         cursorTarget[i].classList.add("cur3");
//         event.preventDefault();
//     }
//     function moveCur(event){
//         cursorTarget[i].classList.remove("cur3");
//         event.preventDefault();
//     }
//     function showCur(event){
//         cursorTarget[i].classList.remove("cur3");
//         event.preventDefault();
//     }
    
//     cursorTarget[i].onmousedown = hideCur;
//     cursorTarget[i].onmousemove = moveCur;
//     cursorTarget[i].onmouseup  = showCur;
// }



// gameContainer.addEventListener("click", function(){
//     mainMenu.style.display = "none";
// });
