let score = 0;
let outOfTime = false;
let numInit = 0.00;
let num = 8000.01;

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

    setInterval(function () {
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
function gemScoreLength() {
    for (let k = 0; k < gemScore.length; k++) {
        gemScore[k].textContent = numInit;
    }
}

//클릭하면 게임 스코어 올라감
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function (e) {
        e.preventDefault();

        if (!outOfTime) {
            score = Math.round((score + num) * 10000) / 10000;

            for (let j = 0; j < gemScore.length; j++) {
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
    items[i].addEventListener("mousedown", function () {
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

        newSpan.addEventListener("animationend", function () {
            this.remove();
        });
    });

    // 모바일 터치 할때 애니메이션
    items[i].addEventListener("mouseup", function () {
        character.classList.add("on");
        characterMotion.classList.remove("on");
    });

    items[i].addEventListener("touchstart", function () {
        character.classList.remove("on");
        characterMotion.classList.add("on");

        //타격 오디오
        // hitAudio.play();

    });

    items[i].addEventListener("touchend", function () {
        character.classList.add("on");
        characterMotion.classList.remove("on");
    });
}

const boost200 = document.querySelector(".boost_200");
const gauge = document.querySelector(".gauge");
//200% 부스트 시간 다 되면 없어지게
boostTimeOut();
function boostTimeOut() {
    // console.log(gauge);

    gauge.addEventListener("animationend", function () {
        boost200.style.display = "none";
    });

}


packageBuy();
function packageBuy() {
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


    async function silverBuy() {
        //실버 버튼 구매 성공
        if (score >= silverPrice) {
            // VIP 실버 구매 모듈 연결
            let purchaseJson = await Purchase(1);
            console.log(purchaseJson);

            silverPop.style.display = "none";
            marker.style.display = "block";
            vipSilverIcon.style.display = "block";
            completeModal.style.display = "block";

            score = Math.round((score - silverPrice) * 10000) / 10000;

            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;
            }

            completeConfirmBtn.addEventListener("click", modalHidden);

        }
        //가격부족 구매 실패
        else {
            silverPop.style.display = "none";
            failPop.style.display = "block";
        }
    }

    async function goldBuy() {
        //골드 버튼 구매 성공
        if (score >= goldPrice) {
            // VIP 골드 구매 모듈 연결
            let purchaseJson = await Purchase(0);

            goldPop.style.display = "none";
            marker.style.display = "block";
            vipGoldIcon.style.display = "block";
            vipSilverIcon.style.display = "none";
            completeModal.style.display = "block";

            score = Math.round((score - goldPrice) * 10000) / 10000;

            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;
            }

            completeConfirmBtn.addEventListener("click", modalHidden);
        }
        //가격부족 구매 실패
        else {
            goldPop.style.display = "none";
            failPop.style.display = "block";
        }
    }

    function modalHidden() {
        completeModal.style.display = "none";
        shopModal.style.visibility = "hidden";
        packageContent.style.visibility = "hidden";
    }
}


//수리 구매
repairBuy();
function repairBuy() {
    const rapairConfirmBtn = document.getElementById("repair_buy_confirm");
    const repairPop = document.querySelector(".repair_modal");
    const repairPrice = 25;


    rapairConfirmBtn.addEventListener("click", repairConfirm);

    function repairConfirm() {
        //구매 성공 했을 때
        if (score >= repairPrice) {
            //여기에 수리 수치 정상화

            repairPop.style.display = "none";

            score = Math.round((score - repairPrice) * 10000) / 10000;

            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;
            }

        }
        //구매 실패 했을 때
        else {
            repairPop.style.display = "none";
            repairFailPop.style.display = "block";
        }
    }
}


//샵 구매 팝업 수량 버튼
shopBuyModal();
function shopBuyModal() {
    const shopPopBoost100LeftBtn = document.querySelector(".boost100 .left_btn"),
        shopPopBoost200LeftBtn = document.querySelector(".boost200 .left_btn"),
        shopPopAuto10mLeftBtn = document.querySelector(".auto10m .left_btn"),
        shopPopAuto1hLeftBtn = document.querySelector(".auto1h .left_btn"),
        shopPopBoost100RightBtn = document.querySelector(".boost100 .right_btn"),
        shopPopBoost200RightBtn = document.querySelector(".boost200 .right_btn"),
        shopPopAuto10mRightBtn = document.querySelector(".auto10m .right_btn"),
        shopPopAuto1hRightBtn = document.querySelector(".auto1h .right_btn"),
        // quantity = document.querySelectorAll(".shop_item_wrap .quantity"),
        quantityBoost100 = document.querySelector(".boost100 .quantity"),
        quantityBoost200 = document.querySelector(".boost200 .quantity"),
        quantityAuto10m = document.querySelector(".auto10m .quantity"),
        quantityAuto1h = document.querySelector(".auto1h .quantity"),
        // shopItemPriceClass = document.querySelectorAll(".shop_item_wrap .price"),
        boost100PriceClass = document.querySelector(".boost100 .price"),
        boost200PriceClass = document.querySelector(".boost200 .price"),
        auto10mPriceClass = document.querySelector(".auto10m .price"),
        auto1hPriceClass = document.querySelector(".auto1h .price"),
        shopItemCancelBtn = document.querySelectorAll(".shop_item_wrap .cancel"),
        // shopItemBuyPop = document.querySelector(".shop_item_buy_modal"),
        itemCompletePop = document.querySelector(".shop_complete_modal"),
        shopBoost100BuyPop = document.querySelector(".shop_item_buy_modal.boost100"),
        shopBoost200BuyPop = document.querySelector(".shop_item_buy_modal.boost200"),
        shopAuto10mBuyPop = document.querySelector(".shop_item_buy_modal.auto10m"),
        shopAuto1hBuyPop = document.querySelector(".shop_item_buy_modal.auto1h"),
        shopBoost100BuyBtn = document.getElementById("boost100_buy_btn"),
        shopBoost200BuyBtn = document.getElementById("boost200_buy_btn"),
        shopAuto10mBuyBtn = document.getElementById("auto10m_buy_btn"),
        shopAuto1hBuyBtn = document.getElementById("auto1h_buy_btn");


    let boost100QuantityNum = quantityBoost100.textContent,
        boost200QuantityNum = quantityBoost200.textContent,
        auto10mQuantityNum = quantityAuto10m.textContent,
        auto1hQuantityNum = quantityAuto1h.textContent;

    let boost100PriceClassNum = boost100PriceClass.textContent,
        boost200PriceClassNum = boost200PriceClass.textContent,
        auto10mPriceClassNum = auto10mPriceClass.textContent,
        auto1hPriceClassNum = auto1hPriceClass.textContent;

    let boost100Num = parseInt(boost100QuantityNum),
        boost200Num = parseInt(boost200QuantityNum),
        auto10mNum = parseInt(auto10mQuantityNum),
        auto10hNum = parseInt(auto1hQuantityNum);

    let boost100Price = parseInt(boost100PriceClassNum),
        boost200Price = parseInt(boost200PriceClassNum),
        auto10mPrice = parseInt(auto10mPriceClassNum),
        auto1hPrice = parseInt(auto1hPriceClassNum);


    shopPopBoost100LeftBtn.addEventListener("click", decreaseBoost100);
    shopPopBoost200LeftBtn.addEventListener("click", decreaseBoost200);
    shopPopAuto10mLeftBtn.addEventListener("click", decreaseAuto10m);
    shopPopAuto1hLeftBtn.addEventListener("click", decreaseAuto1h);
    shopPopBoost100RightBtn.addEventListener("click", increaseBoost100);
    shopPopBoost200RightBtn.addEventListener("click", increaseBoost200);
    shopPopAuto10mRightBtn.addEventListener("click", increaseAuto10m);
    shopPopAuto1hRightBtn.addEventListener("click", increaseAuto1h);
    // shopBuyBtn.addEventListener("click", shopBuy);

    shopBoost100BuyBtn.addEventListener("click", shopBoost100Buy);
    shopBoost200BuyBtn.addEventListener("click", shopBoost200Buy);
    shopAuto10mBuyBtn.addEventListener("click", shopAuto10mBuy);
    shopAuto1hBuyBtn.addEventListener("click", shopAuto1hBuy);

    //구매 수량 증가 boost100
    function increaseBoost100() {
        boost100Num++;
        boost100Price = boost100Price + 200;
        quantityBoost100.textContent = boost100Num;
        boost100PriceClass.textContent = boost100Price;
    }

    //구매 수량 감소 boost100
    function decreaseBoost100() {
        if (boost100Num <= 1) {
            return;
        }
        boost100Num--;
        boost100Price = boost100Price - 200;
        quantityBoost100.textContent = boost100Num;
        boost100PriceClass.textContent = boost100Price;


    }
    //구매 수량 증가 boost200
    function increaseBoost200() {
        boost200Num++;
        boost200Price = boost200Price + 200;
        quantityBoost200.textContent = boost200Num;
        boost200PriceClass.textContent = boost200Price;

    }

    //구매 수량 감소 boost200
    function decreaseBoost200() {
        if (boost200Num <= 1) {
            return;
        }
        boost200Num--;
        boost200Price = boost200Price - 200;
        quantityBoost200.textContent = boost200Num;
        boost200PriceClass.textContent = boost200Price;

    }
    //구매 수량 증가 Auto10m
    function increaseAuto10m() {
        auto10mNum++;
        auto10mPrice = auto10mPrice + 200;
        quantityAuto10m.textContent = auto10mNum;
        auto10mPriceClass.textContent = auto10mPrice;

    }

    //구매 수량 감소 Auto10m
    function decreaseAuto10m() {
        if (auto10mNum <= 1) {
            return;
        }
        auto10mNum--;
        auto10mPrice = auto10mPrice - 200;
        quantityAuto10m.textContent = auto10mNum;
        auto10mPriceClass.textContent = auto10mPrice;

    }

    //구매 수량 증가 Auto1h
    function increaseAuto1h() {
        auto10hNum++;
        auto1hPrice = auto1hPrice + 200;
        quantityAuto1h.textContent = auto10hNum;
        auto1hPriceClass.textContent = auto1hPrice;

    }

    //구매 수량 감소 Auto11h
    function decreaseAuto1h() {
        if (auto10hNum <= 1) {
            return;
        }
        auto10hNum--;
        auto1hPrice = auto1hPrice - 200;
        quantityAuto1h.textContent = auto10hNum;
        auto1hPriceClass.textContent = auto1hPrice;

    }







    //구매 취소시 수량 초기화
    shopItemCancelBtn.forEach(e => {
        e.addEventListener("click", priceInit);
    });

    function priceInit() {
        boost100Num = 1;
        boost200Num = 1;
        auto10mNum = 1;
        auto10hNum = 1;

        boost100Price = 200;
        boost200Price = 200;
        auto10mPrice = 200;
        auto1hPrice = 200;

        quantityBoost100.textContent = 1;
        quantityBoost200.textContent = 1;
        quantityAuto10m.textContent = 1;
        quantityAuto1h.textContent = 1;

        boost100PriceClass.textContent = 200;
        boost200PriceClass.textContent = 200;
        auto10mPriceClass.textContent = 200;
        auto1hPriceClass.textContent = 200;

    }




    // 구매 버튼 누를때
    async function shopBoost100Buy() {
        //구매 실패시                           
        if (score < boost100Price) {
            failPop.style.display = "block";
            shopBoost100BuyPop.style.display = "none";

            priceInit();
        }
        //구매 성공시
        else {

            // 부스트 10분 구매 모듈 연결
            let productJson = await Purchase(3, boost100Num);
            let productInfo = productJson.ProductInfo;

            shopBoost100BuyPop.style.display = "none";
            itemCompletePop.style.display = "block";

            $(".use_now").click(function () {
                useTicketAfterPurchase(3);
            });



            score = Math.round((score - boost100Price) * 10000) / 10000;

            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }




    // 구매 버튼 누를때
    async function shopBoost200Buy() {
        //구매 실패시                           
        if (score < boost200Price) {
            failPop.style.display = "block";
            shopBoost200BuyPop.style.display = "none";

            priceInit();
        }
        //구매 성공시
        else {
            // 부스트 1시간 구매 모듈 연결
            let productJson = await Purchase(2, boost200Num);
            let productInfo = productJson.ProductInfo;
            console.log(productInfo);

            shopBoost200BuyPop.style.display = "none";
            itemCompletePop.style.display = "block";

            $(".use_now").click(function () {
                useTicketAfterPurchase(2);
            });

            score = Math.round((score - boost200Price) * 10000) / 10000;

            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }
    // 구매 버튼 누를때
    async function shopAuto10mBuy() {
        //구매 실패시                           
        if (score < auto10mPrice) {
            failPop.style.display = "block";
            shopAuto10mBuyPop.style.display = "none";

            priceInit();
        }
        //구매 성공시
        else {
            // 오토클릭 10분 구매 모듈 연결
            let productJson = await Purchase(5, auto10mNum);
            let productInfo = productJson.ProductInfo;
            console.log(productInfo);

            shopAuto10mBuyPop.style.display = "none";
            itemCompletePop.style.display = "block";

            $(".use_now").click(function () {
                useTicketAfterPurchase(5);
            });

            score = Math.round((score - auto10mPrice) * 10000) / 10000;

            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }
    // 구매 버튼 누를때
    async function shopAuto1hBuy() {
        //구매 실패시                           
        if (score < auto1hPrice) {
            failPop.style.display = "block";
            shopAuto1hBuyPop.style.display = "none";

            priceInit();
        }
        //구매 성공시
        else {

            // 오토클릭 1시간 구매 모듈 연결
            let productJson = await Purchase(4, auto10hNum);
            let productInfo = productJson.ProductInfo;
            console.log(productInfo);

            shopAuto1hBuyPop.style.display = "none";
            itemCompletePop.style.display = "block";

            $(".use_now").click(function () {
                useTicketAfterPurchase(4);
            });

            score = Math.round((score - auto1hPrice) * 10000) / 10000;

            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;

            }
            priceInit();
        }
    }
}

shopToolBoxModal();
function shopToolBoxModal() {
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

    async function preFunc() {
        //구매 실패시
        if (score < premiumBoxPriceNum) {
            failPop.style.display = "block";
            preModal.style.display = "none";
        }
        //구매 성공시
        else {

            // 랜덤박스 구매 모듈 연결
            let preBoxJson = await Purchase(6);
            let itemList = preBoxJson.ItemList.tbItem;

            preModal.style.display = "none";
            score = Math.round((score - premiumBoxPriceNum) * 10000) / 10000;
            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;

            }

            openPreBox(itemList);
        }

    }

    async function vipFunc() {
        //구매 실패시
        if (score < vipBoxPriceeNum) {
            failPop.style.display = "block";
            vipModal.style.display = "none";
        }
        //구매 성공시
        else {

            // 랜덤박스 구매 모듈 연결
            let vipBoxJson = await Purchase(7);
            let itemList = vipBoxJson.ItemList.tbItem;

            vipModal.style.display = "none";
            score = Math.round((score - vipBoxPriceeNum) * 10000) / 10000;
            for (let i = 0; i < gemScore.length; i++) {
                gemScore[i].textContent = score;
            }

            openVipBox(itemList);
        }
    }

    //console.log(vipBoxPriceeNum);
    // console.log(premiumBox.className);
}


const preOpenModal = document.querySelector(".pre_open_modal");
const vipOpenModal = document.querySelector(".vip_open_modal");

const preItemsUl = document.querySelector(".pre_open_wrap ul");
const openPreBoxText = document.querySelector(".pre_open_wrap .open_text");
const openVipBoxText = document.querySelector(".vip_open_wrap .open_text");
const vipItemsUl = document.querySelector(".vip_open_wrap ul");

// 프리미엄 박스 구매 팝업

function openPreBox(itemList) {
    preOpenModal.style.display = "block";

    console.log(itemList);

    for (let i = 0; i < 10; i++) {
        let itemImage = "";
        switch (itemList[i].Grade) {
            case "Normal":
                itemImage = "<img src=images/item/pick_common.png>"
                break;
            case "Rare":
                itemImage = "<img src=images/item/pick_rare.png>"
                break;
            case "Legend":
                itemImage = "<img src=images/item/pick_legend.png>"
                break;
        }

        setTimeout(function () {
            preItemsUl.insertAdjacentHTML("beforeend", "<li>" + itemImage + "</li>");
        }, 300 * i)
    }
    setTimeout(function () {
        openPreBoxText.style.opacity = 1;
    }, 3000);
}

function openVipBox(itemList) {
    vipOpenModal.style.display = "block";

    console.log(itemList);

    for (let i = 0; i < itemList.length; i++) {
        let itemImage = "";
        switch (itemList[i].Grade) {
            case "Normal":
                itemImage = "<img src=images/item/pick_common.png>"
                break;
            case "Rare":
                itemImage = "<img src=images/item/pick_rare.png>"
                break;
            case "Legend":
                itemImage = "<img src=images/item/pick_legend.png>"
                break;
        }

        setTimeout(function () {
            vipItemsUl.insertAdjacentHTML("beforeend", "<li>" + itemImage + "</li>");
        }, 300 * i)
    }

    setTimeout(function () {
        openVipBoxText.style.opacity = 1;
    }, 3000);
}

// 박스 구매 초기화
boxInit();
function boxInit() {
    preOpenModal.addEventListener("click", function () {
        const preItemsLi = document.querySelectorAll(".pre_open_wrap ul li");
        if (preItemsLi.length === 10) {
            this.style.display = "none";

            openPreBoxText.style.opacity = 0;

            preItemsLi.forEach(e => e.remove());
        }

    });
    vipOpenModal.addEventListener("click", function () {
        const vipItemsLi = document.querySelectorAll(".vip_open_wrap ul li");
        if (vipItemsLi.length === 10) {
            this.style.display = "none";

            openVipBoxText.style.opacity = 0;

            vipItemsLi.forEach(e => e.remove());
        }

    });

}




//오픈씨 바로가기
openseaOpen();
function openseaOpen() {
    const openseaBtn = document.querySelector(".opensea_btn");
    openseaBtn.addEventListener("click", function (ev) {
        ev.preventDefault()
        window.open("https://opensea.io/");
    });
}

//방 이동시 랜덤 이미지 만들기
changeRoom();
function changeRoom() {
    const changeRoomBtn = document.getElementById("change_room_btn");
    const anotherRoomPop = document.querySelector(".another_room_modal");
    const gameWrap = document.querySelector(".game_wrap");
    const imgNumber = 7;
    const audioBtn = document.querySelector(".audio_btn");
    const audio = document.querySelector(".audio");

    //사운드 버튼
    soundOn();
    function soundOn() {
        audioBtn.addEventListener("click", function () {
            this.classList.toggle("off");
            if (audio.paused) {
                audio.play();
            }
            else {
                audio.pause();
            }
        });
    }


    changeRoomBtn.addEventListener("click", function (ev) {
        ev.preventDefault();

        let randomImg = Math.floor(Math.random() * imgNumber);

        //팝업 끄기
        anotherRoomPop.style.display = "none";

        setTimeout(function () {
            gameWrap.style.backgroundImage = `url('images/background/back${randomImg + 1}.jpg')`;
            
            // 만약 오디오 버튼이 켜져있다면 방 바뀔시 오디오 실행
            if(audioBtn.classList.contains("off")){
                // const roomAduio = new Audio();
                audio.src = `audio/back${randomImg + 1}.mp3`;

                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
        }, 1340);


        //애니메이션 추가
        gameWrap.classList.add("ani");
        //이벤트 실행동안 전체 클릭 금지
        gameWrap.classList.add("point_none");
        setTimeout(function () {
            gameWrap.classList.remove("ani");
            gameWrap.classList.remove("point_none");
        }, 3000);

        
    });
}


// =======================================================
// 인벤토리 아이템 추가
async function invenItemAdd() {
    const invenItemUl = document.querySelector(".item_list_wrap .item_list ul");
    const tradeInvenItemUl = document.querySelector(".trade_item_list ul");

    let itemListJson = await ItemList();
    let invenMineItemList = itemListJson.ItemList.tbItem;

    let autoItemList = [
        {
            itemImg: "images/item/auto_click_10m.png",
        },
        {
            itemImg: "images/item/auto_click_1h.png",
        },
    ]

    let boostItemList = [
        {
            itemImg: "images/item/booster_10m.png",
        },
        {
            itemImg: "images/item/booster_1h.png",
        },
    ]


    for (let i = 0; i < invenMineItemList.length; i++) {
        let itemImage = "";
        switch (invenMineItemList[i].Grade) {
            case "Normal":
                if (invenMineItemList[i].CurrentDurability != 1) {
                    itemImage = "images/item/pick_common.png";
                } else {
                    itemImage = "images/item/pick_common2.png";
                }
                break;
            case "Rare":
                if (invenMineItemList[i].CurrentDurability != 1) {
                    itemImage = "images/item/pick_rare.png";
                } else {
                    itemImage = "images/item/pick_rare2.png";
                }
                break;
            case "Legend":
                if (invenMineItemList[i].CurrentDurability != 1) {
                    itemImage = "images/item/pick_legend.png";
                } else {
                    itemImage = "images/item/pick_legend2.png";
                }
                break;
        }
        // TODO: 아이템 채굴량 데이터 필요
        invenItemUl.insertAdjacentHTML("beforeend", "<li><div>" + "<input type=\"hidden\" value=\"" +
            invenMineItemList[i].Item_Idx + "\"/>" + "<img src='" +
            itemImage + "'/><p class=\"item_level\">" + "+" +
            invenMineItemList[i].Level + "</p>" + "<div class=\"item_info\">" + "<p class=\"durability\">" + "<span class=\"now_durability\">" +
            invenMineItemList[i].CurrentDurability + "</span>" + "<span class=\"max_durability\">" + "/ " +
            invenMineItemList[i].MaxDurability + "</span>" + "</p>" + "<p class=\"price\"><span class=\"mining_gem\">" +
            "0.01" + "</span></p>" + "</div>" + "</div>" + "<span></span></li>");
    };

    for (let j = 0; j < autoItemList.length; j++) {
        invenItemUl.insertAdjacentHTML("beforeend", "<li><div>" + "<img src='" + autoItemList[j].itemImg + "'/>" + "</div><span></span></li>")
    }

    for (let k = 0; k < boostItemList.length; k++) {
        invenItemUl.insertAdjacentHTML("beforeend", "<li><div>" + "<img src='" + boostItemList[k].itemImg + "'/>" + "</div><span></span></li>")
    }



    // 트레이드 인벤토리 ================
    for (let i = 0; i < invenMineItemList.length; i++) {
        // TODO: 아이템 이미지 중복제거 필요
        let itemImage = "";
        switch (invenMineItemList[i].Grade) {
            case "Normal":
                if (invenMineItemList[i].CurrentDurability != 1) {
                    itemImage = "images/item/pick_common.png";
                } else {
                    itemImage = "images/item/pick_common2.png";
                }
                break;
            case "Rare":
                if (invenMineItemList[i].CurrentDurability != 1) {
                    itemImage = "images/item/pick_rare.png";
                } else {
                    itemImage = "images/item/pick_rare2.png";
                }
                break;
            case "Legend":
                if (invenMineItemList[i].CurrentDurability != 1) {
                    itemImage = "images/item/pick_legend.png";
                } else {
                    itemImage = "images/item/pick_legend2.png";
                }
                break;
        }
        tradeInvenItemUl.insertAdjacentHTML("beforeend", "<li><div>" + "<input type=\"hidden\" value=\"" +
            invenMineItemList[i].Item_Idx + "\"/>" + "<img src='" +
            itemImage + "'/><p class=\"item_level\">" + "+" +
            invenMineItemList[i].Level + "</p>" + "<div class=\"item_info\">" + "<p class=\"durability\">" + "<span class=\"now_durability\">" +
            invenMineItemList[i].CurrentDurability + "</span>" + "<span class=\"max_durability\">" + "/ " +
            invenMineItemList[i].MaxDurability + "</span>" + "</p>" + "<p class=\"price\"><span class=\"mining_gem\">" +
            "0.01" + "</span></p>" + "</div>" + "</div>" + "<span></span></li>");
    };

    const InvenItemLi = document.querySelectorAll(".item_list_wrap .item_list ul li");

    // 아이템 리스트 추가 후 이벤트 재추가 
    invenItemList = $(".inven_modal .item_list ul li");
    targetListSpan = $(".inven_modal .item_list ul li > span");
    targetListImg = $(".inven_modal .item_list ul li img");
    previewItem = $("inven_modal .preview_item");

    invenItemList.on("click", listClickEvent);

    tradeInvenItemList = $(".trade_item_list ul li");
    tradeTargetListSpan = $(".trade_item_list ul li > span");

    tradeInvenItemList.click(function () {
        tradeTargetListSpan.removeClass("target_img");
        $(this).find(tradeTargetListSpan).addClass("target_img");
    });

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




//캐릭터 선택창 이벤트
createCharactor();
function createCharactor() {
    const createCharactorList = document.querySelectorAll(".login_ch_list ul li");
    const loginWrap = document.querySelector(".game_login");
    const createBtn = document.querySelector(".login_create_btn");
    const chNameInput = document.getElementById("ch_name");
    const chNameInputValue = chNameInput.value;
    const aleatModal = document.querySelector(".create_symbol_modal");
    const symbolModalBtn = document.querySelector(".create_symbol_modal .cancel")



    createCharactorList.forEach(ev => {
        ev.addEventListener("click", listAddClassOn);
    });

    function listAddClassOn(e) {
        for (let i = 0; i < createCharactorList.length; i++) {
            createCharactorList[i].classList.remove("on");
        }
        e.currentTarget.classList.add("on");

        createCharactorList.forEach(e => {
            if (e.classList.contains("on") && this.value !== "") {
                createBtn.classList.add("on");
            }
        });
    }


    createBtn.addEventListener("click", function () {
        if (this.classList.contains("on")) {
            //on 활성화 되었을때
            if (chNameInputValue.length === null) {
                aleatModal.style.visibility = "visible";

                symbolModalBtn.addEventListener("click", function () {
                    chNameInput.focus();
                    chNameInput.value = "";
                });
            } else {
                loginWrap.style.display = "none";
            }
        } else {
            chNameInput.focus();
            //on 활성화 되지 않았을때
        }
    });



}









// 윈도우에서만 마우스 커서 이벤트 발생하는 함수
pcOnlyMouseEvent();
function pcOnlyMouseEvent() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
        // 커서 이미지 교체 애니메이션
        const cursorTarget = document.querySelectorAll(".stone_item img");
        for (let i = 0; i < cursorTarget.length; i++) {
            function hideCur(event) {
                cursorTarget[i].classList.add("cur3");
                event.preventDefault();
            }
            function moveCur(event) {
                cursorTarget[i].classList.remove("cur3");
                event.preventDefault();
            }
            function showCur(event) {
                cursorTarget[i].classList.remove("cur3");
                event.preventDefault();
            }

            cursorTarget[i].onmousedown = hideCur;
            cursorTarget[i].onmousemove = moveCur;
            cursorTarget[i].onmouseup = showCur;
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

$(".login_btn").click(function (e) {
    e.preventDefault();

    Login();
});


$(".signUp_btn").click(function (e) {
    e.preventDefault();

    location.href = "/DigToc/SignUp"
});

async function useTicketAfterPurchase(productNum) {
    let ticketJson = await UseTicket(productNum);
    console.log(ticketJson);
    

}




// changeBgm();
// function changeBgm(){
//     const gameWrap = document.querySelector(".game_wrap");
//     const backAudioBtn = document.querySelector(".menu_list .audio_btn");
//     const changeBtn = document.getElementById("change_room_btn");
    

//     let backNum = ["back1", "back2", "back3", "back4", "back5", "back6", "back7", "back8",]
    
//     let gameWrapStyle = gameWrap.style.backgroundImage;
    
    
//     changeBtn.addEventListener("click", function(){
//         if(gameWrapStyle === "url('images/background/back1.jpg')"){
//             console.log("a");
//         }
//         if(gameWrapStyle === "url('images/background/back2.jpg')"){
//             console.log("a");
//         }
//         if(gameWrapStyle === "url('images/background/back3.jpg')"){
//             console.log("a");
//         }
//         if(gameWrapStyle === "url('images/background/back4.jpg')"){
//             console.log("a");
//         }
//         console.log(gameWrapStyle);
//     });




// }