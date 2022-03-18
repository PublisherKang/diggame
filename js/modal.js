const invenPopBtn = $(".inventory_btn");
const backBtn = $(".back_btn");
const shopPopBtn = $(".shop_btn");

// 인벤 팝업
// 아이템 리스트 모듈 연결
invenPopBtn.click(function (ev) {
    const invenItemUl = document.querySelector(".item_list_wrap .item_list ul");
    ev.preventDefault();
    invenItemUl.innerHTML = '';
    invenItemAdd();
    $(".inven_modal").css("visibility", "visible");
    $(".ranking_modal").hide();
    $(".another_room_modal").css("display", "none");
});
<<<<<<< HEAD

// 샵 팝업
shopPopBtn.click(function (ev) {
    ev.preventDefault();
    $(".shop_modal").css("visibility", "visible");
    $(".package_content").css("visibility", "visible");
    $(".ranking_modal").hide();
    $(".shop_menu_btn li").eq(0).addClass("on")
    $(".another_room_modal").css("display", "none");
});

// Back 버튼
backBtn.click(function (ev) {
    ev.preventDefault();
    // 백 버튼 해당 부모 팝업 화면에서 사라짐
    $(this).parent().parent().css("visibility", "hidden");

    //샵 컨텐츠 내용 숨김
    $(".content_wrap > div").css("visibility", "hidden");

    //샵 버튼 클래스 원 위치
    $(".shop_menu_btn li").removeClass("on");

    $(".item_list ul li span").removeClass("target_img");

    $(".equip span").html("EQUIP");
});

$(".game_headerIn .rank_btn").click(function () {
    $(".cont_ranking").toggleClass("on");
    $(".user_item_info").removeClass("on");
    $(".gem_gauge span").toggleClass("on");

    const btnAudio = new Audio();
    btnAudio.src = "/audio/mouse-click.mp3";
    btnAudio.play();

});

//랭킹 팝업의 아이템 이미지 클릭시 유저 정보 나옴
$(".ch_item").click(function () {
    // $(this).parents(".ranking_inner ul").siblings().removeClass("on");
    $(this).parents(".ranking_inner ul").siblings().toggleClass("on");

    const btnAudio = new Audio();
    btnAudio.src = "/audio/mouse-click.mp3";
=======

// 샵 팝업
shopPopBtn.click(function (ev) {
    ev.preventDefault();
    $(".shop_modal").css("visibility", "visible");
    $(".package_content").css("visibility", "visible");
    $(".ranking_modal").hide();
    $(".shop_menu_btn li").eq(0).addClass("on")
    $(".another_room_modal").css("display", "none");
});

// Back 버튼
backBtn.click(function (ev) {
    ev.preventDefault();
    // 백 버튼 해당 부모 팝업 화면에서 사라짐
    $(this).parent().parent().css("visibility", "hidden");

    //샵 컨텐츠 내용 숨김
    $(".content_wrap > div").css("visibility", "hidden");

    //샵 버튼 클래스 원 위치
    $(".shop_menu_btn li").removeClass("on");

    $(".item_list ul li span").removeClass("target_img");

    $(".equip span").html("EQUIP");
});

$(".game_headerIn .rank_btn").click(function () {
    $(".cont_ranking").toggleClass("on");
    $(".user_item_info").removeClass("on");
    $(".gem_gauge span").toggleClass("on");
    
    const btnAudio = new Audio();
    btnAudio.src = "audio/mouse-click.mp3";
    btnAudio.play();
    
});

//랭킹 팝업의 아이템 이미지 클릭시 유저 정보 나옴
$(".ch_item").click(function () {
    // $(this).parents(".ranking_inner ul").siblings().removeClass("on");
    $(this).parents(".ranking_inner ul").siblings().toggleClass("on");

    const btnAudio = new Audio();
    btnAudio.src = "audio/mouse-click.mp3";
>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21
    btnAudio.play();
});


//인벤토리 ALL Item Miningtool 버튼 클릭했을때 탭
$(".item_tab_btn ul li").click(function () {
    $(this).siblings().removeClass("on");
    $(this).addClass("on");
});


//아이템 추가하기
let invenItemList = $(".inven_modal .item_list ul li");
let targetListSpan = $(".inven_modal .item_list ul li > span");
let targetListImg = $(".inven_modal .item_list ul li img");
let previewItem = $("inven_modal .preview_item");

let itemArray = [
    "images/item/booster_10m.png",
    "images/item/booster_1h.png",
]

let autoItem = [
    "images/item/auto_click_10m.png",
    "images/item/auto_click_1h.png",
]

let miningItemCommon = [
    "images/item/pick_common.png",
    "images/item/pick_common2.png",
]

let miningItemRare = [
    "images/item/pick_rare.png",
    "images/item/pick_rare2.png",
]

let miningItemLegend = [
    "images/item/pick_legend.png",
    "images/item/pick_legend2.png",
]


// 첫번째 아이템 equip 장착 표시
targetListSpan.eq(0).addClass("equip_img");
if (targetListSpan.hasClass("equip_img") === true) {
    $(".equip_btn").removeClass("equip_img");
}

//인벤토리 잠금 버튼
<<<<<<< HEAD
$(".lock_btn").click(async function () {
    let targetItemIdx = document.querySelector(".target_img").parentNode.querySelector(".itemIdx").value;
    let resultJson = null;
    if ($(this).hasClass("lockon")) {
        resultJson = await ItemUnlock(targetItemIdx);
    } else {
        resultJson = await ItemLock(targetItemIdx);
    }

    if (resultJson.IsSuccess == 0) {
        $(this).toggleClass("lockon");
    }
});


invenItemList.on("click", listClickEvent);

//인벤토리 아이템 클릭시 이벤트 함수
function listClickEvent(event) {
    let cloneThis = $(this).clone();
    targetListSpan.removeClass("target_img");
    $(this).find(targetListSpan).addClass("target_img");
    previewItem.append(cloneThis);


    //this 아이템 클릭시 해당 span 삭제 자식 요소 삭제
    previewItem.children().first().remove();
    previewItem.children().first().find("span").remove();


    // =====================
    const itemAttr = $(this).children().children("img").attr("src");

    // console.log(itemAttr);


    if (itemAttr === "/images/item/pick_rare.png" || itemAttr === "/images/item/pick_legend.png") {
        $(".mint_item_btn").addClass("mint_btn_on");
    } else {
        $(".mint_item_btn").removeClass("mint_btn_on");
    }


    let targetIsLocked = document.querySelector(".target_img").parentNode.querySelector(".isLocked").value;
    if (targetIsLocked == "true") {
        $(".lock_btn").addClass("lockon");
    } else {
        $(".lock_btn").removeClass("lockon");
    }
=======
$(".lock_btn").click(function () {
    $(this).toggleClass("lockon");
});


invenItemList.on("click", listClickEvent);

//인벤토리 아이템 클릭시 이벤트 함수
function listClickEvent(event) {
    let cloneThis = $(this).clone();
    targetListSpan.removeClass("target_img");
    $(this).find(targetListSpan).addClass("target_img");
    previewItem.append(cloneThis);


    //this 아이템 클릭시 해당 span 삭제 자식 요소 삭제
    previewItem.children().first().remove();
    previewItem.children().first().find("span").remove();


    // =====================
    const itemAttr = $(this).children().children("img").attr("src");


    // console.log(itemAttr);


    if (itemAttr === "images/item/pick_rare.png" || itemAttr === "images/item/pick_legend.png") {
        $(".mint_item_btn").addClass("mint_btn_on");
    } else {
        $(".mint_item_btn").removeClass("mint_btn_on");
    }

>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21

    // 아이템 클릭시 선택된 아이템 이름 변경
    miningItemCommon.forEach(e => {
        if (e === itemAttr) {
            $(".inven_modal .upgrade_wrap .item_level").text("Lv 1. Pick");
            $(".inven_modal .upgrade_wrap .item_common").text("Common").css("color", "#ccc");
        }
    });
    miningItemRare.forEach(e => {
        if (e === itemAttr) {
            $(".inven_modal .upgrade_wrap .item_level").text("Lv 1. Pick");
            $(".inven_modal .upgrade_wrap .item_common").text("Rare").css("color", "#00ffff");
        }
    });
    miningItemLegend.forEach(e => {
        if (e === itemAttr) {
            $(".inven_modal .upgrade_wrap .item_level").text("Lv 1. Pick");
            $(".inven_modal .upgrade_wrap .item_common").text("Legend").css("color", "#ff0");
        }
    });

    itemArray.forEach((e, index, arr) => {
        if (arr[0] === itemAttr) {
            $(".inven_modal .upgrade_wrap .item_level").text("Mining 100% UP/10M");
            $(".inven_modal .upgrade_wrap .item_common").text("Item").css("color", "#ccc");
        }
        if (arr[1] === itemAttr) {
            $(".inven_modal .upgrade_wrap .item_level").text("Mining 200% UP/1H");
            $(".inven_modal .upgrade_wrap .item_common").text("Item").css("color", "#ccc");
        }

    });

    autoItem.forEach((e, index, arr) => {
        if (arr[0] === itemAttr) {
            $(".inven_modal .upgrade_wrap .item_level").text("Auto Click/10M");
            $(".inven_modal .upgrade_wrap .item_common").text("Item").css("color", "#ccc");
        }
        if (arr[1] === itemAttr) {
            $(".inven_modal .upgrade_wrap .item_level").text("Auto Click/1H");
            $(".inven_modal .upgrade_wrap .item_common").text("Item").css("color", "#ccc");
        }
    });



    //클릭시 equied가 있다면 Select 텍스트 equip 변경
    if (targetListSpan.hasClass("target_img") === true) {
        $(".equip_btn").addClass("on");
        $(".equip span").html("Select");
        $(".equip span").css("color", "#ff0");
        $(".upgrade_wrap").css("border", "2px solid #ff0");
        $(".up_num").show();
    }
    if (targetListSpan.hasClass("equip_img target_img") === true) {
        $(".equip span").html("EQUIP");
        $(".equip span").css("color", "#00ff9a");
        $(".equip_btn").removeClass("on");
        $(".upgrade_wrap").css("border", "2px solid #00ff9a");
        $(".up_num").hide();
    }


    //소모성 아이템 이미지 클릭 시

<<<<<<< HEAD
    //if (itemArray.includes(itemAttr) || autoItem.includes(itemAttr)) {
    //    $(".useitem_btn").addClass("on");
    //    $(".equip_btn").removeClass("on");
    //    $(".Upgrade").removeClass("on");
    //    $(".mint_item_btn").removeClass("on");
    //    $(".repair").removeClass("on");
    //    $(".upgrade_wrap .durability").hide();
    //    $(".upgrade_wrap .price").hide();
    //} else {
    //    $(".useitem_btn").removeClass("on");
    //    $(".Upgrade").addClass("on");
    //    $(".mint_item_btn").addClass("on");
    //    $(".repair").addClass("on");
    //    $(".upgrade_wrap .durability").show();
    //    $(".upgrade_wrap .price").show();
    //}
=======
    if (itemArray.includes(itemAttr) || autoItem.includes(itemAttr)) {
        $(".useitem_btn").addClass("on");
        $(".equip_btn").removeClass("on");
        $(".Upgrade").removeClass("on");
        $(".mint_item_btn").removeClass("on");
        $(".repair").removeClass("on");
        $(".upgrade_wrap .durability").hide();
        $(".upgrade_wrap .price").hide();
    } else {
        $(".useitem_btn").removeClass("on");
        $(".Upgrade").addClass("on");
        $(".mint_item_btn").addClass("on");
        $(".repair").addClass("on");
        $(".upgrade_wrap .durability").show();
        $(".upgrade_wrap .price").show();
    }
>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21


    // console.log(itemAttr);
};


//Eqip 버튼 클릭 했을때 장착 배경 표시
$(".equip_btn").click(function () {
    const itemAttr = $(this).children().attr("src");
    targetListSpan.removeClass("equip_img");
    invenItemList.find(".target_img").addClass("equip_img");
    $(".equip span").html("EQUIP");
    $(this).removeClass("on");
    // console.log(this);
});

$(".useitem_btn").click(function (event) {
    event.preventDefault();
    $(".shop_use_modal").css("display", "block");
});




//=============== 업그레이드 영역 ===============


//업그레이드 버튼 클릭시
$(".Upgrade").click(function () {

    $(this).removeClass("on");
    $(".repair").removeClass("on");
    $(".mint_item_btn").removeClass("on");
    $(".equip_btn").removeClass("on");
    $(".item_tab_btn ul li").hide();

    $(".item_list_wrap").addClass("upgrade");
    $(".upgrade_now").addClass("on");
    $(".up_cancel").addClass("on");
    $(".upgrade_tab_btn").show();

    targetListSpan.removeClass("target_img");




    $(".item_list ul li img").each(function (index, item) {

        let itemListAttr = item.getAttribute("src");

        if (itemArray.includes(itemListAttr)) {
            this.parentElement.style.display = "none";
        }

    });



    // if(itemArray.includes(itemListAttr = item)){
    //     invenItemList.css("display", "none")
    // }




    //아이템 리스트 클릭이벤트 제거
    invenItemList.off("click");

    invenItemList.on("click", upgradeClickFunc);

});

function upgradeClickFunc() {
    // let cloneThis = $(this).clone();
    // targetListSpan.removeClass("target_img");
    $(this).find(targetListSpan).toggleClass("upgrade_target");
    // previewItem.append(cloneThis);

    // //this 아이템 클릭시 해당 span 삭제 자식 요소 삭제
    // previewItem.children().first().remove();
    // previewItem.children().first().find("span").remove();

    let targetListLength = $(".upgrade_target").length;

    const targetSpan = document.querySelectorAll(".upgrade_target");
    const targetTagSpan = document.querySelectorAll(".item_list ul li span");
    // console.log(targetSpan);
    // console.log(targetTagSpan);
    // let isValid = false;

    targetSpan.forEach(e => {
        //let targetItemAttr = e.previousElementSibling.getAttribute("src");
        if (targetListLength === 3) {
            //if (miningItemCommon[0] === targetItemAttr || miningItemCommon[1] === targetItemAttr) {
            $(".upgrade_now").addClass("upgradeon");
            //}
        } else {
            $(".upgrade_now").removeClass("upgradeon");
        }
    });




}

//취소 버튼 클릭시
$(".up_cancel").click(function () {
    $(this).removeClass("on");
    $(".item_list_wrap").removeClass("upgrade");
    $(".upgrade_now").removeClass("on");
    $(".up_cancel").removeClass("on");
    $(".item_tab_btn ul li").show();

    $(".Upgrade").addClass("on");
    $(".repair").addClass("on");
    $(".mint_item_btn").addClass("on");
    $(".upgrade_tab_btn").hide();
    $(".upgrade_now").removeClass("upgradeon");


    targetListSpan.removeClass("upgrade_target");


    //취소 버튼 클릭시 이전 이벤트 다시 활성화
    invenItemList.on("click", listClickEvent);


    $(".item_list ul li img").each(function (index, item) {

        let itemListAttr = item.getAttribute("src");

        if (itemArray.includes(itemListAttr)) {
            this.parentElement.style.display = "block";
        }

    });


    invenItemList.unbind("click", upgradeClickFunc);

});


//업그레이드 NOW 버튼 클릭시

$(".upgrade_now").click(async function () {
    const targetSpan = document.querySelectorAll(".upgrade_target");
    let itemIdxArr = []
    for (let i = 0; i < targetSpan.length; i++) {
<<<<<<< HEAD
        itemIdxArr.push(Number(targetSpan[i].parentNode.querySelector(".itemIdx").value));
=======
        itemIdxArr.push(Number(targetSpan[i].parentNode.querySelector("input[type=hidden]").value));
>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21
    }

    // 아이템 합성 모듈 연결
    let itemCombineJson = await ItemCombine(itemIdxArr);
    let resultItem = itemCombineJson.ResultItem;

    if ($(this).hasClass("upgradeon") === true) {
<<<<<<< HEAD
        let itemImage = getItemImage(resultItem);
        $(".upgrade_complete .complete_item img").attr("src", itemImage);
        $(".upgrade_complete .item_name .item_rank").html(resultItem.Grade);
        $(".upgrade_complete .item_level").html("<span>Lv." + resultItem.Level + "</span><span>-></span><span>Lv." + resultItem.Level + "</span>");
        document.querySelector(".upgrade_complete .item_idx").value = resultItem.Item_Idx;

        $(".upgrade_complete").show();
    }
});

$(".upgrade_complete").click(async function () {
    $(this).hide();
    $(".upgrade_now").removeClass("upgradeon");

    $(this).removeClass("on");
    $(".item_list_wrap").removeClass("upgrade");
    $(".upgrade_now").removeClass("on");
    $(".up_cancel").removeClass("on");
    $(".item_tab_btn ul li").show();

    $(".Upgrade").addClass("on");
    $(".repair").addClass("on");
    $(".mint_item_btn").addClass("on");
    $(".upgrade_tab_btn").hide();


    targetListSpan.removeClass("upgrade_target");


    //취소 버튼 클릭시 이전 이벤트 다시 활성화
    invenItemList.on("click", listClickEvent);


    $(".item_list ul li img").each(function (index, item) {

        let itemListAttr = item.getAttribute("src");

        if (itemArray.includes(itemListAttr)) {
            this.parentElement.style.display = "block";
        }

    });
=======
        let itemImage = "";
        switch (resultItem.Grade) {
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
        console.log(resultItem);
        $(".upgrade_complete .complete_item").html(itemImage);
        $(".upgrade_complete .item_name .item_rank").html(resultItem.Grade);
        $(".upgrade_complete .item_level").html("<span>Lv." + resultItem.Level + "</span>-><span>Lv." + resultItem.Level + "</span>");

        $(".upgrade_complete").show();
    }
});

$(".upgrade_complete").click(function () {
    $(this).hide();
    $(".upgrade_now").removeClass("upgradeon");
});
>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21

    // 아이템 리스트 리로드
    let itemListJson = await ItemList();
    let invenMineItemList = itemListJson.ItemList.tbItem;

    let invenItemUl = document.querySelector(".item_list_wrap .item_list ul");
    invenItemUl.innerHTML = '';
    let combineResultItemIdx = document.querySelector(".upgrade_complete .item_idx").value;
    for (let i = 0; i < invenMineItemList.length; i++) {
        let itemImage = getItemImage(invenMineItemList[i]);
        let liPosition = invenMineItemList[i].Item_Idx == combineResultItemIdx ? "afterbegin" : "beforeend";
        let newItemText = invenMineItemList[i].Item_Idx == combineResultItemIdx ? "<i class=\"new_item_text\">New</i>" : "";

        invenItemUl.insertAdjacentHTML(liPosition, getItemListHtml(invenMineItemList[i], itemImage, newItemText));
    };

    // 아이템 리스트 추가 후 이벤트 재추가 
    reAddItemClickEvent();

    invenItemList.unbind("click", upgradeClickFunc);
});



<<<<<<< HEAD

=======
>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21
// ***************************************************************
// mint an item 버튼 클릭 했을때
$(".mint_item_btn").click(function (event) {
    const bottonAttr = $(this);
<<<<<<< HEAD

    if (bottonAttr.hasClass("mint_btn_on") === true) {
        $(".minting_ques_modal").css("display", "block")


    }

});

$(".mint_now").click(async function () {
    $(this).parents('.alert_modal').css("display", "none");

    // 민트할 아이템 이미지 가져오기
    let mintImage = $(".mint_modal .mint_wrap .mint_item img");
    let mintItemLevel = document.querySelector(".mint_modal .mint_wrap .item_level");
    mintImage.attr("src", $(".target_img").parent().find("img").attr("src"));
    mintItemLevel.textContent = "Lv." + document.querySelector(".target_img").parentNode.querySelector(".item_level").textContent.replace("+", "") + " Pick";

    $(".mint_modal").show();
    $(".mint_explan").scrollTop(0);
});


$(".mint_explan").scroll(function () {

    let scrollTop = $(this).scrollTop();

    if (scrollTop > 490) {
        $(".mint_wrap .item_area .mint_btn").addClass("on");
    } else {
        $(".mint_wrap .item_area .mint_btn").removeClass("on");
    }
});

$(".mint_close_btn").click(function () {
    $(this).parents('.mint_modal').hide();
});


// 민팅 완료뒤 back to game 버튼 클릭시
$(".back_game").click(function () {
    $(this).parents('.mint_success_modal').hide();
    $(".inven_modal").css("visibility", "hidden");
});

$(".mint_close_btn.success").click(function () {
    $(this).parents('.mint_success_modal').hide();
});

// NFT Mint 모듈 연결
$(".mint_btn").click(async function () {
    if (!$(this).hasClass("on")) {
        return false;
    }
    let selectedItemIdx = document.querySelector(".target_img").parentNode.querySelector("input[type=hidden]").value;

    let mintItemJson = await NftMint(selectedItemIdx);
    let mintItemInfo = mintItemJson.ItemInfo;

    let itemImage = getItemImage(mintItemInfo);

    document.querySelector(".mint_success_modal .item_level").textContent = `Lv.${mintItemInfo.Level} Pick`;
    $(".mint_success_modal .mint_item img").attr("src", itemImage);

    let rankSpanArr = document.querySelectorAll(".mint_success_modal .item_rank span");

    for (let idx = 0; idx < rankSpanArr.length; idx++) {
        let rankSpan = rankSpanArr[idx];
        if (mintItemInfo.Grade === rankSpan.textContent) {
            rankSpan.style.display = "block";
        } else {
            rankSpan.style.display = "none";
        }
    }

    $(".mint_modal").hide();
    $(".mint_success_modal").show();




=======

    if (bottonAttr.hasClass("mint_btn_on") === true) {
        $(".minting_ques_modal").css("display", "block")


    }

});

$(".mint_now").click(async function () {
    $(this).parents('.alert_modal').css("display", "none");
    $(".mint_modal").show();
    $(".mint_explan").scrollTop(0);
});


$(".mint_explan").scroll(function () {

    let scrollTop = $(this).scrollTop();

    if (scrollTop > 490) {
        $(".mint_wrap .item_area .mint_btn").addClass("on");
    } else {
        $(".mint_wrap .item_area .mint_btn").removeClass("on");
    }
});

$(".mint_close_btn").click(function () {
    $(this).parents('.mint_modal').hide();
});


// 민팅 완료뒤 back to game 버튼 클릭시
$(".back_game").click(function () {
    $(this).parents('.mint_success_modal').hide();
    $(".inven_modal").css("visibility", "hidden");
});

$(".mint_close_btn.success").click(function () {
    $(this).parents('.mint_success_modal').hide();
});

// NFT Mint 모듈 연결
$(".mint_btn").click(async function () {
    if (!$(this).hasClass("on")) {
        return false;
    }
    let selectedItemIdx = document.querySelector(".target_img").parentNode.querySelector("input[type=hidden]").value;

    let mintInfo = await NftMint(selectedItemIdx);

    console.log(mintInfo);
>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21
});



// ***************************************************************




// repair 팝업
const repairBtn = $(".btn_wrap .repair");
const repairPop = $(".repair_modal");
const repairCancelBtn = $(".repair_modal .cancel");
repairBtn.click(function (ev) {
    ev.preventDefault();
    repairPop.css("display", "block");
    repairPop.css("background", "rgba(0, 0, 0, .7)");

});
repairCancelBtn.click(function (ev) {
    ev.preventDefault();
    repairPop.css("display", "none");
});




// 인벤토리에서 상점 바로가기 버튼
const goToolBtn = $(".go_tools");

goToolBtn.click(function (ev) {
    ev.preventDefault();
    $(".inven_modal").css("visibility", "hidden");
    $(".shop_modal").css("visibility", "visible");
    $(".package_content").css("visibility", "visible");
    $(".shop_menu_btn li").eq(0).addClass("on")
});



// 샵 텝 메뉴
const shopMenuBtn = $(".shop_menu_btn ul li");
// const shopTarget = $(evnet.target);

shopMenuBtn.click(function (event) {
    event.preventDefault();
    let idx = $(this).index();
    $(this).siblings().removeClass("on");
    $(this).addClass("on");

    $(".content_wrap > div").css("visibility", "hidden");
    $(".content_wrap > div").eq(idx).css("visibility", "visible");
});



//컨테이너 랭킹 클릭 랭킹 팝업 나타남
const rankingBtn = $(".menu_list li .rank_btn");
rankingBtn.click(async function (ev) {
    ev.preventDefault();

    // 랭킹 모듈 연결
    let rankingListJson = await RankingList();
    let rankingList = rankingListJson.RankingList.tbRanking;
    let rankingUl = document.querySelector(".rank_list ul");

    rankingUl.innerHTML = '';

    for (let idx = 0; idx < rankingList.length; idx++) {
        rankingUl.insertAdjacentHTML("beforeend",
            `<li>
                <span class='rank_num'>${idx + 1}</span>
                <p class='user_id'>${rankingList[idx].Nickname}</p>
                <p class='user_score'>${rankingList[idx].Point}</p>
                </li>`);
    }

    $(".ranking_modal").show();
});

$(".ranking_modal").click(function (ev) {
    if ($(".ranking_modal").is(ev.target)) {
        $(".rank_tab_btn li").removeClass("on")
        $(".rank_tab_btn li").eq(0).addClass("on");

        $(".ranking_modal").hide();
    }

});

//랭킹 팝업 닫기
const rankCloseBtn = $(".ranking_pop_close");
rankCloseBtn.click(function (ev) {
    ev.preventDefault();
    $(".ranking_modal").hide();

    $(".rank_tab_btn li").removeClass("on")
    $(".rank_tab_btn li").eq(0).addClass("on");

});



//샵 마이닝 툴 팝업
$(".tool_content li").eq(0).click(function () {
    $(".premiumitem_modal").css("display", "block");

});
$(".tool_content li").eq(1).click(function () {
    $(".vipitem_modal").css("display", "block");



});


//채널 변경 버튼
$(".ch_change_btn").click(function (ev) {
    ev.preventDefault();
    $(".another_room_modal").css("display", "block");
    $(".ranking_modal").hide();
});

$(".another_room_modal .cancel").click(function (ev) {
    ev.preventDefault();
    $(".another_room_modal").css("display", "none");
});




const rankTabBtn = $(".rank_tab_btn li");
rankTabBtn.click(function (ev) {
    ev.preventDefault();
    let idx = $(this).index();

    $(this).siblings().removeClass("on");
    $(this).addClass("on");

    $(".list_wrap > div").siblings().removeClass("on");
    $(".list_wrap > div").eq(idx).addClass("on");
});



//즉시 수리 팝업
const nowItemBtn = $(".now_item");
const repairNow = $(".repair_now");
nowItemBtn.click(function (ev) {
    ev.preventDefault();
    $(".immediately_repair_modal").css("display", "block");
});

repairNow.click(function (ev) {
    ev.preventDefault();
    $(".repair_modal").css("display", "block");
    $(".repair_modal").css("background", "transparent")
    $(this).parents('.alert_modal').css("display", "none");
});



// 상점 실버, 골드 구매 버튼 팝업
const silverPopBtn = $(".vip_silver_wrap");
const goldPopBtn = $(".vip_gold_wrap");
const silverPop = $("#silver_pop");
const goldPop = $("#gold_pop");

// const silverBuyBtn = $("#silverPop .buy_btn");
// const goldBuyBtn = $("#goldPop .buy_btn");


silverPopBtn.click(function () {
    silverPop.css("display", "block");
});

goldPopBtn.click(function () {
    goldPop.css("display", "block");
});

// $(function(){
//     function preBoxOpen(){
//         for(let i = 0; i < 10; i++){
//             setTimeout(function(){
//                 $(".pre_open_wrap ul").append("<li>"+ "<img src=images/item/pick_rare.png>" +"</li>");
//             },500 * i)
//         }
//     }
//     function vipBoxOpen(){
//         for(let i = 0; i < 10; i++){
//             setTimeout(function(){
//                 $(".vip_open_wrap ul").append("<li>"+ "<img src=images/item/pick_rare.png>" +"</li>");
//             },500 * i)
//         }
//     }
// });





//샵 아이템 구매 팝업
function shopModalList(number) {
    $(".shop_item_buy_modal").eq(number).css("display", "block");
    $(".pop_title span").eq(number).siblings().removeClass("on");
    $(".pop_title span").eq(number).addClass("on");
    $(".img_wrap img").eq(number).siblings().removeClass("on");
    $(".img_wrap img").eq(number).addClass("on");
}

const shopBuyBtn = $(".shop_item_buy");

for (let i = 0; i < shopBuyBtn.length; i++) {
    shopBuyBtn.eq(i).click(function (ev) {
        shopModalList(i);
    });

}


// 아이템 리스트 모듈 연결
//트레이드 업로드 영역 클릭시
$(".my_trade_wrap .upload_wrap").click(function () {
    let tradeInvenItemUl = document.querySelector(".trade_item_list ul");
    tradeInvenItemUl.innerHTML = '';
    invenItemAdd();
    $(".trade_inven_wrap").css({
        "transform": "translateY(0%)",
        "transition": "all .3s ease-in",
        "opacity": 1,
    });
});

//트레이드 인벤토리 닫기버튼
$(".trade_inven_wrap .close_btn").click(function () {
    $(this).parents(".trade_inven_wrap").css({
        "transform": "translateY(100%)",
        "transition": "all .3s ease-in",
        "opacity": 0,
    });
});

//트레이드 아이템 클릭했을 때 
let tradeInvenItemList = $(".trade_item_list ul li");
let tradeTargetListSpan = $(".trade_item_list ul li > span");

tradeInvenItemList.click(function () {
    tradeTargetListSpan.removeClass("target_img");
    $(this).find(tradeTargetListSpan).addClass("target_img");
});


//트레이드 업로드 아이템 닫기 버튼 클릭시
$(".item_close_btn").click(function () {
    $(".trade_inner_item").hide();
});

//트레이드 confirm 버튼 클릭시 캐릭터 이미지 confirm 표시 및 unconfirm 활성
$(".trade_btn_wrap .confirm").click(function () {
    $(".trade_ch.my_ch .confirm_area").show();
    $(this).hide();
    $(".trade_btn_wrap .unconfirm").show();
    $(".confirm_select_none").show();
});

// 트레이드 unconfirm 클릭시
$(".trade_btn_wrap .unconfirm").click(function () {
    $(".trade_ch.my_ch .confirm_area").hide();
    $(this).hide();
    $(".trade_btn_wrap .confirm").show();
    $(".confirm_select_none").hide();
});

//트레이드 close버튼 클릭시
$(".trade_btn_wrap .cancel").click(function () {
    $(this).parents(".trade_modal").hide();
    $(".confirm_area").hide();
    $(".trade_btn_wrap .unconfirm").hide();
    $(".trade_btn_wrap .confirm").show();
    $(".confirm_select_none").hide();
});


<<<<<<< HEAD
$(".menu_list ul li").click(function () {
    const btnAudio = new Audio();
    btnAudio.src = "/audio/mouse-click.mp3";
    btnAudio.play();

=======
$(".menu_list ul li").click(function(){
    const btnAudio = new Audio();
    btnAudio.src = "audio/mouse-click.mp3";
    btnAudio.play();
    
>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21
});




// 캔슬 버튼
const cancelBtn = $(".cancel");
cancelBtn.click(function () {
    $(this).parents(".alert_modal").css("display", "none");
});



<<<<<<< HEAD
$(".menu_wrap").click(function () {
=======
$(".menu_wrap").click(function(){
>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21
    $(this).parents(".ch").siblings().find(".user_menu").removeClass("on");
    $(this).siblings(".user_menu").addClass("on");
});

<<<<<<< HEAD
$('.ch .user_menu button').click(function () {
    $(this).parent(".user_menu").removeClass("on");
});
=======
$('.ch .user_menu button').click(function(){
    $(this).parent(".user_menu").removeClass("on");
});


>>>>>>> 097f5199959ca74ca5d52dbee6fe1b1203735d21
