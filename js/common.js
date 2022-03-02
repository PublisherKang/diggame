let score = 0;
let outOfTime = false;
let numInit = 0.00;
let num = 0.01;

const items = document.querySelectorAll(".stone_item");

var startTime;

const clicksTxt = document.getElementById("clicks");
const gameContainer = document.querySelector(".game_container");
const failPop = document.querySelector(".fail_modal");
const repairFailPop = document.querySelector(".repair_moneyfail_modal");



// 클릭하면 초당 클릭 스피드 올라감
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
const tradePointScore = document.getElementById("trade_point_score");
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



        console.log(score);
    });
    
    // 캐릭터 애니메이션 PC 마우스 이벤트
    const characterParent = document.querySelector(".ch");
    const character = document.querySelector(".ch img");
    const characterMotion = character.nextElementSibling;
    const hitAudio = document.querySelector(".hit_audio");
    items[i].addEventListener("mousedown", function(){
        character.classList.remove("on");
        characterMotion.classList.add("on");
        
        // 타격 오디오
        // hitAudio.play();

        //스코어 애니메이션
        let newSpan = document.createElement("span");
        // const stornImgs = document.querySelectorAll(".stone_item img");

        newSpan.textContent = num;
        newSpan.classList.add("ani_num");
        
        characterParent.appendChild(newSpan);
        
        newSpan.addEventListener("animationend",function(){
            this.remove();
        });
    });
    
    // 모바일 터치 할때 애니메이션
    items[i].addEventListener("mouseup", function(){
        character.classList.add("on");
        characterMotion.classList.remove("on");
    });
    
    items[i].addEventListener("touchstart", function(){
        character.classList.remove("on");
        characterMotion.classList.add("on");

        //타격 오디오
        // hitAudio.play();

    });
    
    items[i].addEventListener("touchend", function(){
        character.classList.add("on");
        characterMotion.classList.remove("on");
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
    const completeModal = document.querySelector(".complete_buy_modal");
    const completeConfirmBtn = document.querySelector(".complete_buy_modal .confirm");
    const shopModal = document.querySelector(".shop_modal");
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
            completeModal.style.visibility = "visible";
            
            score = Math.round((score - silverPrice) * 10000) / 10000;
            
            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;
            }

            completeConfirmBtn.addEventListener("click", modalHidden);

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
            completeModal.style.visibility = "visible";
            
            score = Math.round((score - goldPrice) * 10000) / 10000;
            
            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;
            }

            completeConfirmBtn.addEventListener("click", modalHidden);
        }
        //가격부족 구매 실패
        else{
            goldPop.style.visibility = "hidden";
            failPop.style.visibility = "visible";
        }
    }

    function modalHidden(){
        completeModal.style.visibility = "hidden";
        shopModal.style.visibility = "hidden";
        packageContent.style.visibility = "hidden";
    }
}


//수리 구매
repairBuy();
function repairBuy(){
    const rapairConfirmBtn = document.getElementById("repair_buy_confirm");
    const repairPop = document.querySelector(".repair_modal");
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
            repairFailPop.style.visibility = "visible";
        }
    }
}


//샵 구매 팝업 수량 버튼
shopBuyModal();
function shopBuyModal(){
    const shopPopLeftBtn = document.querySelector(".left_btn");
    const shopPopRightBtn = document.querySelector(".right_btn");
    const quantity = document.querySelector(".quantity");
    const shopItemPriceClass = document.querySelector(".shop_item_wrap .price");
    const shopItemCancelBtn = document.querySelector(".shop_item_wrap .cancel");
    // const shopBuyBtn = document.getElementById("shop_buy_btn");
    const shopItemBuyPop = document.querySelector(".shop_item_buy_modal");
    const itemCompletePop = document.querySelector(".shop_complete_modal");

    const shopBoost100BuyPop = document.querySelector(".shop_item_buy_modal.boost100");
    const shopBoost200BuyPop = document.querySelector(".shop_item_buy_modal.boost200");
    const shopAuto10mBuyPop = document.querySelector(".shop_item_buy_modal.auto10m");
    const shopAuto1hBuyPop = document.querySelector(".shop_item_buy_modal.auto1h");

    const shopBoost100BuyBtn = document.getElementById("boost100_buy_btn");
    const shopBoost200BuyBtn = document.getElementById("boost200_buy_btn");
    const shopAuto10mBuyBtn = document.getElementById("auto10m_buy_btn");
    const shopAuto1hBuyBtn = document.getElementById("auto1h_buy_btn");

    let quantityNum = quantity.textContent;
    let shopItemPriceClassNum = shopItemPriceClass.textContent;
    

    let num = parseInt(quantityNum);
    let price = parseInt(shopItemPriceClassNum);


    shopPopRightBtn.addEventListener("click", increase);
    shopPopLeftBtn.addEventListener("click", decrease);
    // shopBuyBtn.addEventListener("click", shopBuy);

    shopBoost100BuyBtn.addEventListener("click", shopBoost100Buy);
    shopBoost200BuyBtn.addEventListener("click", shopBoost200Buy);
    shopAuto10mBuyBtn.addEventListener("click", shopAuto10mBuy);
    shopAuto1hBuyBtn.addEventListener("click", shopAuto1hBuy);

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
    shopItemCancelBtn.addEventListener("click", priceInit);
    function priceInit(){
        num = 1;
        price = 200;
        quantity.textContent = 1;
        shopItemPriceClass.textContent = 200;
    }
    
    // 구매 버튼 누를때
    function shopBoost100Buy(){
        //구매 실패시                           
        if(score < price){
            failPop.style.visibility = "visible";
            shopBoost100BuyPop.style.visibility = "hidden";

            priceInit();
        }
        //구매 성공시
        else{
            shopBoost100BuyPop.style.visibility = "hidden";
            itemCompletePop.style.visibility = "visible";

            score = Math.round((score - price) * 10000) / 10000;

            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }
    // 구매 버튼 누를때
    function shopBoost200Buy(){
        //구매 실패시                           
        if(score < price){
            failPop.style.visibility = "visible";
            shopBoost200BuyPop.style.visibility = "hidden";

            priceInit();
        }
        //구매 성공시
        else{
            shopBoost200BuyPop.style.visibility = "hidden";
            itemCompletePop.style.visibility = "visible";

            score = Math.round((score - price) * 10000) / 10000;

            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }
    // 구매 버튼 누를때
    function shopAuto10mBuy(){
        //구매 실패시                           
        if(score < price){
            failPop.style.visibility = "visible";
            shopAuto10mBuyPop.style.visibility = "hidden";

            priceInit();
        }
        //구매 성공시
        else{
            shopAuto10mBuyPop.style.visibility = "hidden";
            itemCompletePop.style.visibility = "visible";

            score = Math.round((score - price) * 10000) / 10000;

            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }
    // 구매 버튼 누를때
    function shopAuto1hBuy(){
        //구매 실패시                           
        if(score < price){
            failPop.style.visibility = "visible";
            shopAuto1hBuyPop.style.visibility = "hidden";

            priceInit();
        }
        //구매 성공시
        else{
            shopAuto1hBuyPop.style.visibility = "hidden";
            itemCompletePop.style.visibility = "visible";

            score = Math.round((score - price) * 10000) / 10000;

            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }
}

shopToolBoxModal();
function shopToolBoxModal(){
    const preModal = document.querySelector(".premiumitem_modal");
    const vipModal = document.querySelector(".vipitem_modal");
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
        //구매 실패시
        if(score < premiumBoxPriceNum){
            failPop.style.visibility = "visible";
            preModal.style.visibility = "hidden";
        }
        //구매 성공시
        else{
            preModal.style.visibility = "hidden";
            score = Math.round((score - premiumBoxPriceNum) * 10000) / 10000;
            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;

            }

            openPreBox();
        }
        
    }

    function vipFunc(){
        //구매 실패시
        if(score < vipBoxPriceeNum){
            failPop.style.visibility = "visible";
            vipModal.style.visibility = "hidden";
        }
        //구매 성공시
        else{
            vipModal.style.visibility = "hidden";
            score = Math.round((score - vipBoxPriceeNum) * 10000) / 10000;
            for(let i = 0; i < gemScore.length; i++){
                gemScore[i].textContent = score;
            }

            openVipBox();
        }
    }

    console.log(vipBoxPriceeNum);
    // console.log(premiumBox.className);
}


const preOpenModal = document.querySelector(".pre_open_modal");
const vipOpenModal = document.querySelector(".vip_open_modal");

const preItemsUl = document.querySelector(".pre_open_wrap ul");
const openPreBoxText = document.querySelector(".pre_open_wrap .open_text");
const openVipBoxText = document.querySelector(".vip_open_wrap .open_text");
const vipItemsUl = document.querySelector(".vip_open_wrap ul");

// 프리미엄 박스 구매 팝업

function openPreBox(){
    preOpenModal.style.display = "block";
    
    for(let i = 0; i < 10; i++){
        setTimeout(function(){
            preItemsUl.insertAdjacentHTML("beforeend", "<li>"+ "<img src=images/item/pick_rare.png>" +"</li>");
        }, 300 * i)
    }
    setTimeout(function(){
        openPreBoxText.style.opacity = 1;
    },3000);
}

function openVipBox(){
    vipOpenModal.style.display = "block";
    
    for(let i = 0; i < 10; i++){
        setTimeout(function(){
            vipItemsUl.insertAdjacentHTML("beforeend", "<li>"+ "<img src=images/item/pick_rare.png>" +"</li>");
        }, 300 * i)
    }

    setTimeout(function(){
        openVipBoxText.style.opacity = 1;
    },3000);
}

// 박스 구매 초기화
boxInit();
function boxInit(){
    preOpenModal.addEventListener("click", function(){
        const preItemsLi = document.querySelectorAll(".pre_open_wrap ul li");
        if(preItemsLi.length === 10){
            this.style.display = "none";
            
            openPreBoxText.style.opacity = 0;

            preItemsLi.forEach(e => e.remove());
        }
        
    });
    vipOpenModal.addEventListener("click", function(){
        const vipItemsLi = document.querySelectorAll(".vip_open_wrap ul li");
        if(vipItemsLi.length === 10){
            this.style.display = "none";
            
            openVipBoxText.style.opacity = 0;

            vipItemsLi.forEach(e => e.remove());
        }
        
    });
    
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
    const anotherRoomPop = document.querySelector(".another_room_modal");
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


// =======================================================
// 인벤토리 아이템 추가
invenItemAdd();
function invenItemAdd(){
    const invenItemUl = document.querySelector(".item_list_wrap .item_list ul");
    const tradeInvenItemUl = document.querySelector(".trade_item_list ul");

    console.log(tradeInvenItemUl);

    let invenMineItemList = [
        {
            itemImg : "images/item/pick_common.png",
            level : 1,
            grade : "common",
            mining : 0.01,
            durability : 240,
            maxDurability : 240,
        },
        {
            itemImg : "images/item/pick_common2.png",
            level : 1,
            grade : "common",
            mining : 0.01,
            durability : 240,
            maxDurability : 240,
        },
        {
            itemImg : "images/item/pick_rare.png",
            level : 1,
            grade : "rare",
            mining : 0.01,
            durability : 240,
            maxDurability : 240,
        },
        {
            itemImg : "images/item/pick_rare2.png",
            level : 1,
            grade : "rare",
            mining : 0.01,
            durability : 240,
            maxDurability : 240,
        },
        {
            itemImg : "images/item/pick_legend.png",
            level : 1,
            grade : "legend",
            mining : 0.01,
            durability : 240,
            maxDurability : 240,
        },
        {
            itemImg : "images/item/pick_legend2.png",
            level : 1,
            grade : "legend",
            mining : 0.01,
            durability : 240,
            maxDurability : 240,
        },
    ];
    
    let autoItemList = [
        {
            itemImg : "images/item/auto_click_10m.png",
        },
        {
            itemImg : "images/item/auto_click_1h.png",
        },
    ]

    let boostItemList = [
        {
            itemImg : "images/item/booster_10m.png",
        },
        {
            itemImg : "images/item/booster_1h.png",
        },
    ]


    for(let i = 0; i < invenMineItemList.length; i++){
        invenItemUl.insertAdjacentHTML("beforeend", "<li><div>"+ "<img src='" + invenMineItemList[i].itemImg + "'/><p class=\"item_level\">" + "+" + invenMineItemList[i].level + "</p>" + "<div class=\"item_info\">" + "<p class=\"durability\">" + "<span class=\"now_durability\">" + invenMineItemList[i].durability + "</span>" + "<span class=\"max_durability\">" + "/ " + + invenMineItemList[i].maxDurability + "</span>" + "</p>" + "<p class=\"price\"><span class=\"mining_gem\">"+ invenMineItemList[i].mining +"</span></p>" + "</div>" +"</div>" +"<span></span></li>");
    };

    for(let j = 0; j < autoItemList.length; j++){
        invenItemUl.insertAdjacentHTML("beforeend", "<li><div>"+ "<img src='" + autoItemList[j].itemImg + "'/>" + "</div><span></span></li>")
    }
    
    for(let k = 0; k < boostItemList.length; k++){
        invenItemUl.insertAdjacentHTML("beforeend", "<li><div>"+ "<img src='" + boostItemList[k].itemImg + "'/>" + "</div><span></span></li>")
    }
    


    // 트레이드 인벤토리 ================
    for(let i = 0; i < invenMineItemList.length; i++){
        tradeInvenItemUl.insertAdjacentHTML("beforeend", "<li><div>"+ "<img src='" + invenMineItemList[i].itemImg + "'/><p class=\"item_level\">" + "+" + invenMineItemList[i].level + "</p>" + "<div class=\"item_info\">" + "<p class=\"durability\">" + "<span class=\"now_durability\">" + invenMineItemList[i].durability + "</span>" + "<span class=\"max_durability\">" + "/ " + + invenMineItemList[i].maxDurability + "</span>" + "</p>" + "<p class=\"price\"><span class=\"mining_gem\">"+ invenMineItemList[i].mining +"</span></p>" + "</div>" +"</div>" +"<span></span></li>");
    };

    const InvenItemLi = document.querySelectorAll(".item_list_wrap .item_list ul li");
    
    InvenItemLi[2].insertAdjacentHTML("beforeend", "<i class=\"new_item_text\">New</i>")


    // const durabilitySpan = document.querySelector(".now_durability");
    // durabilitySpan.textContent = itemDurability.durability;

    // const itemListLi = document.createElement("li");
    // const itemListDiv = document.createElement("div");
    // const itemListDivInDiv = document.createElement("div");
    // const itemListImg = document.createElement("img");
    // const itemListP = document.createElement("p");
    // const itemListP2 = document.createElement("p");
    // const itemListSpan = document.createElement("span");
    
    // const itemLiDiv = document.querySelectorAll(".item_list ul li .item_wrap");
    // const itemLiDivDiv = document.querySelectorAll(".item_list ul li > div > div");

    // const invenItemInfoDurability = document.querySelectorAll("durability");
    
    // // li추가
    // invenItemUl.append(itemListLi);

    // //div 추가
    // itemListDiv.classList.add("item_wrap");
    // itemListLi.append(itemListDiv);
    
    // //img 추가
    // itemListDiv.append(itemListImg);
    // itemListImg.setAttribute("src", invenImgList[0]);

    // // p추가
    // itemListDiv.append(itemListP);
    // itemListP.classList.add("item_level");
    // itemListP.textContent = "+" + itemLevel.lv1;

    // itemListDiv.append(itemListP2);
    // itemListP2.classList.add("item_lock");

    // itemListDiv.append(itemListDivInDiv);
    // itemListDivInDiv.classList.add("item_info");


    // itemLiDivDiv.forEach(e => {
    //     e.classList.add("item_info");
    // });

    // invenItemInfoDurability.forEach(e => {

    // });




    // console.log(invenItemUl);
}

//새로운 아이템이 인벤에 추가 되었을때 New 아이템

// newItemAdd();
// function newItemAdd(){
//     const itemLi = document.querySelectorAll(".item_list li")[3];
//     let newSpan = document.createElement("i");

//     newSpan.classList.add("new_item_text");
//     newSpan.textContent = "New";
//     itemLi.append(newSpan);
// }




// 윈도우에서만 마우스 커서 이벤트 발생하는 함수
pcOnlyMouseEvent();
function pcOnlyMouseEvent(){
    if(window.matchMedia("(min-width: 1024px)").matches){
        // 커서 이미지 교체 애니메이션
        const cursorTarget = document.querySelectorAll(".stone_item img");
        for(let i = 0; i < cursorTarget.length; i++){
            function hideCur(event){
                cursorTarget[i].classList.add("cur3");
                event.preventDefault();
            }
            function moveCur(event){
                cursorTarget[i].classList.remove("cur3");
                event.preventDefault();
            }
            function showCur(event){
                cursorTarget[i].classList.remove("cur3");
                event.preventDefault();
            }
            
            cursorTarget[i].onmousedown = hideCur;
            cursorTarget[i].onmousemove = moveCur;
            cursorTarget[i].onmouseup  = showCur;
        }
    }
}


//game_wrap 마우스 우클릭 메뉴 방지
// mouseRightBtnFalse();
// function mouseRightBtnFalse(){
//     const gameWrap = document.querySelector(".game_wrap");
//     gameWrap.oncontextmenu = function (e) {
        
//         return false;
//        }
// }


//모바일 더블클릭시 화면 확대 방지
// document.documentElement.addEventListener('touchstart', function (event){
//     if(event.touches.length > 1){
//         event.preventDefault(); 
//     } 
// }, false);

// var lastTouchEnd = 0; 

// document.documentElement.addEventListener('touchend', function (event){
//     var now = (new Date()).getTime();
//     if (now - lastTouchEnd <= 300) {
//         event.preventDefault(); 
//     } lastTouchEnd = now; 
// }, false);

