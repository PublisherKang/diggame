let score = 0;
let outOfTime = false;
let numInit = 0.00;
let num = 1111.01;

const items = document.querySelectorAll(".stone_item");

var startTime;

const clicksTxt = document.getElementById("clicks");
const gameContainer = document.querySelector(".game_container");
const failPop = document.querySelector(".fail_popup");


//클릭하면 초당 클릭 스피드 올라감
startGameSpeed();
function startGameSpeed() {
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
const gemScore = document.querySelectorAll(".gem_score")


// gemScore 클래스 반복
gemScoreLength();
function gemScoreLength(){
    for(let k = 0; k < gemScore.length; k++){
        gemScore[k].textContent = numInit;
    }
}

//클릭하면 게임 스코어 올라감
for(let i = 0; i < items.length; i++){
    items[i].addEventListener("click", function(e) {
        e.preventDefault();
        
        if (!outOfTime) {
        score = Math.round((score + num) * 10000) / 10000;
    
            for(let j = 0; j < gemScore.length; j++){
                gemScore[j].textContent = score
            }
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

        console.log(score);
    });
}

const boost200 = document.querySelector(".boost_200");
const gauge = document.querySelector(".gauge");
//200% 부스트 시간 다 되면 없어지게
boostTimeOut();
function boostTimeOut(){
    // console.log(gauge);

    gauge.addEventListener("animationend", function(){
        boost200.style.display = "none";
    });

}


packageBuy();
function packageBuy(){
    //실버 버튼 구매
    const silverBuyBtn = document.getElementById("sliver_buy_btn");
    const goldBuyBtn = document.getElementById("gold_buy_btn");
    const silverPop = document.getElementById("silver_pop");
    const goldPop = document.getElementById("gold_pop");
    const vipSilverIcon = document.querySelector(".vip_silver");
    const vipGoldIcon = document.querySelector(".vip_gold");
    const marker = document.querySelector(".marker");
    const completePopup = document.querySelector(".complete_buy_popup");
    const completeConfirmBtn = document.querySelector(".complete_buy_popup .confirm");
    const shopPopup = document.querySelector(".shop_popup");
    const packageContent = document.querySelector(".package_content");

    let silverPrice = 5000;
    let goldPrice = 8000;
    
    silverBuyBtn.addEventListener("click", silverBuy);
    goldBuyBtn.addEventListener("click", goldBuy);


    function silverBuy(){
        //실버 버튼 구매 성공
        if(score >= silverPrice){
            silverPop.style.visibility = "hidden";
            marker.style.display = "block";
            vipSilverIcon.style.visibility = "visible";
            completePopup.style.visibility = "visible";
            
            score = Math.round((score - silverPrice) * 10000) / 10000;
            
            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;
            }

            completeConfirmBtn.addEventListener("click", popupHidden);

        }
        //가격부족 구매 실패
        else{
            silverPop.style.visibility = "hidden";
            failPop.style.visibility = "visible";
        }
    }

    function goldBuy(){
        //골드 버튼 구매 성공
        if(score >= goldPrice){
            goldPop.style.visibility = "hidden";
            marker.style.display = "block";
            vipGoldIcon.style.visibility = "visible";
            vipSilverIcon.style.visibility = "hidden";
            completePopup.style.visibility = "visible";
            
            score = Math.round((score - goldPrice) * 10000) / 10000;
            
            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;
            }

            completeConfirmBtn.addEventListener("click", popupHidden);
        }
        //가격부족 구매 실패
        else{
            goldPop.style.visibility = "hidden";
            failPop.style.visibility = "visible";
        }
    }

    function popupHidden(){
        completePopup.style.visibility = "hidden";
        shopPopup.style.visibility = "hidden";
        packageContent.style.visibility = "hidden";
    }
}


//수리 구매
repairBuy();
function repairBuy(){
    const rapairConfirmBtn = document.getElementById("repair_buy_confirm");
    const repairPop = document.querySelector(".repair_popup");
    const repairPrice = 25;


    rapairConfirmBtn.addEventListener("click", repairConfirm);

    function repairConfirm(){
        //구매 성공 했을 때
        if(score >= repairPrice){
            //여기에 수리 수치 정상화

            repairPop.style.visibility = "hidden";

            score = Math.round((score - repairPrice) * 10000) / 10000;

            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;
            }

        }
        //구매 실패 했을 때
        else{
            repairPop.style.visibility = "hidden";
            failPop.style.visibility = "visible";
        }
    }
}


//샵 구매 팝업 수량 버튼
shopBuyPopup();
function shopBuyPopup(){
    const shopPopLeftBtn = document.querySelector(".left_btn");
    const shopPopRightBtn = document.querySelector(".right_btn");
    const quantity = document.querySelector(".quantity");
    const shopItemPriceClass = document.querySelector(".shop_item_wrap .price");
    const shopItemBtn = document.querySelector(".shop_item_wrap .cancel");
    const shopBuyBtn = document.getElementById("shop_buy_btn");
    const shopItemBuyPop = document.querySelector(".shop_item_buy_popup");
    const itemCompletePop = document.querySelector(".shop_complete_popup");


    let quantityNum = quantity.textContent;
    let shopItemPriceClassNum = shopItemPriceClass.textContent;
    

    let num = parseInt(quantityNum);
    let price = parseInt(shopItemPriceClassNum);
 

    shopPopRightBtn.addEventListener("click", increase);
    shopPopLeftBtn.addEventListener("click", decrease);
    shopBuyBtn.addEventListener("click", shopBuy);

    //구매 수량 증가
    function increase(){
        num++;
        price = price + 200;
        quantity.textContent = num;
        shopItemPriceClass.textContent = price;
        console.log(num);
        console.log(price);
    }
    
    //구매 수량 감소
    function decrease(){
        if(num <= 1){
            return;
        }
        num--;
        price = price - 200;
        quantity.textContent = num;
        shopItemPriceClass.textContent = price;
        console.log(num);
        console.log(price);
    }
    
    //구매 취소시 수량 초기화
    shopItemBtn.addEventListener("click", priceInit);
    function priceInit(){
        num = 1;
        price = 200;
        quantity.textContent = 1;
        shopItemPriceClass.textContent = 200;
    }
    
    // 구매 버튼 누를때
    function shopBuy(){
        //구매 실패시                           
        if(score < price){
            failPop.style.visibility = "visible";
            shopItemBuyPop.style.visibility = "hidden";

            priceInit();
        }
        //구매 성공시
        else{
            shopItemBuyPop.style.visibility = "hidden";
            itemCompletePop.style.visibility = "visible";

            score = Math.round((score - price) * 10000) / 10000;

            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }
}

shopToolBoxPopup();
function shopToolBoxPopup(){
    const prePopup = document.querySelector(".premiumitem_popup");
    const vipPopup = document.querySelector(".vipitem_popup");
    const preBuyBtn = document.querySelector(".pre_buy_btn");
    const vipBuyBtn = document.querySelector(".vip_buy_btn");
    const premiumBox = document.querySelector(".premium_price");
    const vipBox = document.querySelector(".vipbox_price");

    const premiumBoxPrice = premiumBox.textContent;
    const vipBoxPrice = vipBox.textContent;
    
    let premiumBoxPriceNum = parseInt(premiumBoxPrice);
    let vipBoxPriceeNum = parseInt(vipBoxPrice);

    preBuyBtn.addEventListener("click", preFunc);
    vipBuyBtn.addEventListener("click", vipFunc);

    function preFunc(){
        if(score < premiumBoxPriceNum){
            failPop.style.visibility = "visible";
            prePopup.style.visibility = "hidden";
        }else{
            prePopup.style.visibility = "hidden";
            score = Math.round((score - premiumBoxPriceNum) * 10000) / 10000;
            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;

            }
        }
        
    }

    function vipFunc(){
        if(score < vipBoxPriceeNum){
            failPop.style.visibility = "visible";
            vipPopup.style.visibility = "hidden";
        }else{
            vipPopup.style.visibility = "hidden";
            score = Math.round((score - vipBoxPriceeNum) * 10000) / 10000;
            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;

            }
        }
    }

    console.log(vipBoxPriceeNum);
    // console.log(premiumBox.className);
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
        }, 1340);
        
        
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






//모바일 더블클릭시 화면 확대 방지
document.documentElement.addEventListener('touchstart', function (event){
    if(event.touches.length > 1){
        event.preventDefault(); 
    } 
}, false);

var lastTouchEnd = 0; 

document.documentElement.addEventListener('touchend', function (event){
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault(); 
    } lastTouchEnd = now; 
}, false);

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
    
    
//게이지 바
// const gaugeWrap = document.querySelector(".gauge_wrap");
// const gauge = document.querySelector(".gauge");

// let width = 230
// let interval = setInterval(widthMinus, 100);

// widthMinus();
// function widthMinus(){
//     if(width <= 0){
//         clearInterval(interval);
//         width = 230;
//     }else{
//         width--;
//         gauge.style.width = 1;
//     }
// }
