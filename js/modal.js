// 인벤토리 팝업
$(function(){
    const invenPopBtn = $(".inventory_btn");
    const backBtn = $(".back_btn");
    const shopPopBtn = $(".shop_btn");
    
    // 인벤 팝업
    invenPopBtn.click(function(ev){
        ev.preventDefault();
        $(".inven_modal").css("visibility", "visible");
        $(".ranking_modal").hide();
        $(".another_room_modal").css("visibility", "hidden");
    });

    // 샵 팝업
    shopPopBtn.click(function(ev){
        ev.preventDefault();
        $(".shop_modal").css("visibility", "visible");
        $(".package_content").css("visibility", "visible");
        $(".ranking_modal").hide();
        $(".shop_menu_btn li").eq(0).addClass("on")
        $(".another_room_modal").css("visibility", "hidden");
    });
    
    // Back 버튼
    backBtn.click(function(ev){
        ev.preventDefault();
        // 백 버튼 해당 부모 팝업 화면에서 사라짐
        $(this).parent().parent().css("visibility", "hidden");

        //샵 컨텐츠 내용 숨김
        $(".content_wrap > div").css("visibility", "hidden");

        //샵 버튼 클래스 원 위치
        $(".shop_menu_btn li").removeClass("on");

        $(".item_list ul li span").removeClass("target_img");

        $(".equip span").html("<i></i>EQUIP");
        $(".equip span i").css("background", "rgb(37, 223, 207)");
    });
});



$(function(){
    //아이템 추가하기
    const invenItemList = $(".item_list ul li");
    const targetListSpan = $(".item_list ul li span");
    const targetListImg = $(".item_list ul li img");
    const previewItem = $(".preview_item");
    
    // 첫번째 아이템 equip 장착 표시
    targetListSpan.eq(0).addClass("equip_img");
    if(targetListSpan.hasClass("equip_img") === true){
        $(".equip_btn").removeClass("equip_img");
    }
    
    invenItemList.click(function(event){
        let cloneThis = $(this).clone();
        targetListSpan.removeClass("target_img");
        $(this).find(targetListSpan).addClass("target_img");
        previewItem.append(cloneThis);
        
    
        //this 아이템 클릭시 해당 span 삭제 자식 요소 삭제
        previewItem.children().first().remove();
        previewItem.children().first().find("span").remove();

   
        // =====================
        const itemAttr = $(this).children("img").attr("src");
        let itemArray = [
            "images/item/booster_10m.png",
            "images/item/booster_1h.png",
            "images/item/auto_click_10m.png",
            "images/item/auto_click_1h.png",
        ];

        // console.log(itemAttr);

        
        if(itemAttr === "images/item/pick_rare.png" || itemAttr === "images/item/pick_legend.png"){
            $(".mint_item_btn").addClass("mint_btn_on");
        }else{
            $(".mint_item_btn").removeClass("mint_btn_on");
        }
        


   //클릭시 equied가 있다면 Select 텍스트 equip 변경
        if(targetListSpan.hasClass("target_img") === true){
            $(".equip_btn").addClass("on");
            $(".equip span").html("<i></i>Select");
            $(".equip span i").css("background", "#ff0");
        }
        if(targetListSpan.hasClass("equip_img target_img") === true){
            $(".equip span").html("<i></i>EQUIP");
            $(".equip_btn").removeClass("on");
        }
        

        //소모성 아이템 이미지 클릭 시
        
        if(itemArray.includes(itemAttr)){
        // if(itemAttr === itemArray[0] || itemAttr === itemArray[1] || itemAttr === itemArray[2] || itemAttr === itemArray[3]){
            $(".useitem_btn").addClass("on");
            $(".equip_btn").removeClass("on");
            $(".Upgrade").removeClass("on");
            $(".mint_item_btn").removeClass("on");
            $(".repair").removeClass("on");
        }else{
            $(".useitem_btn").removeClass("on");
            $(".Upgrade").addClass("on");
            $(".mint_item_btn").addClass("on");
            $(".repair").addClass("on");
        }
        
        console.log(itemAttr);
    });


    //Eqip 버튼 클릭 했을때 장착 배경 표시
    $(".equip_btn").click(function(){
        const itemAttr = $(this).children().attr("src");
        targetListSpan.removeClass("equip_img");
        invenItemList.find(".target_img").addClass("equip_img");
        
        $(this).removeClass("on");
        // console.log(this);
    });
    
    $(".useitem_btn").click(function(event){
        event.preventDefault();
        $(".shop_use_modal").css("visibility", "visible");
    });


});


// ***************************************************************
// mint an item 버튼 클릭 했을때
$(".mint_item_btn").click(function(event){
    const bottonAttr = $(this);
    
    if(bottonAttr.hasClass("mint_btn_on") === true){     
        $(".minting_ques_modal").css("visibility", "visible")
        
        
    }
    
});

$(".mint_now").click(function(){
    $(this).parents('.alert_modal').css("visibility", "hidden");
    $(".mint_popup").show();
});


$(".mint_explan").scroll(function(){
    let scrollTop = $(this).scrollTop();

    if(scrollTop > 490){
        $(".mint_wrap .item_area .mint_btn").addClass("on");
    }else{
        $(".mint_wrap .item_area .mint_btn").removeClass("on");
    }
});

$(".mint_close_btn").click(function(){
    $(this).parents('.mint_popup').hide();
    
});

// ***************************************************************




$(function(){
    // repair 팝업
    const repairBtn = $(".btn_wrap .repair");
    const repairPop = $(".repair_modal");
    const repairCancelBtn = $(".repair_modal .cancel");
    repairBtn.click(function(ev){
        ev.preventDefault();
        repairPop.css("visibility", "visible");
        repairPop.css("background", "rgba(0, 0, 0, .7)");

    });
    repairCancelBtn.click(function(ev){
        ev.preventDefault();
        repairPop.css("visibility", "hidden");
    });
});


$(function(){
    // 인벤토리에서 상점 바로가기 버튼
    const goToolBtn = $(".go_tools");

    goToolBtn.click(function(ev){
        ev.preventDefault();
        $(".inven_modal").css("visibility", "hidden");
        $(".shop_modal").css("visibility", "visible");
        $(".package_content").css("visibility", "visible");
        $(".shop_menu_btn li").eq(0).addClass("on")
    });
});

$(function(){
    // 샵 텝 메뉴
    const shopMenuBtn = $(".shop_menu_btn ul li");
    // const shopTarget = $(evnet.target);
    
    shopMenuBtn.click(function(event){
        event.preventDefault();
        let idx = $(this).index();
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        $(".content_wrap > div").css("visibility", "hidden");
        $(".content_wrap > div").eq(idx).css("visibility", "visible");
    });
    
});

$(function(){
    //컨테이너 랭킹 클릭 랭킹 팝업 나타남
    const rankingBtn = $(".menu_list li .rank_btn");
    rankingBtn.click(function(ev){
        ev.preventDefault();
        $(".ranking_modal").show();
    });

    $(".ranking_modal").click(function(ev){
        if($(".ranking_modal").is(ev.target)){
            $(".rank_tab_btn li").removeClass("on")
            $(".rank_tab_btn li").eq(0).addClass("on");
            
            $(".ranking_modal").hide();
        }

    });
    
    //랭킹 팝업 닫기
    const rankCloseBtn = $(".ranking_pop_close");
    rankCloseBtn.click(function(ev){
        ev.preventDefault();
        $(".ranking_modal").hide();
    
        $(".rank_tab_btn li").removeClass("on")
        $(".rank_tab_btn li").eq(0).addClass("on");
    
    });
    
});


//샵 마이닝 툴 팝업
$(function(){
    $(".tool_content li").eq(0).click(function(){
        $(".premiumitem_modal").css("visibility", "visible");

    });
    $(".tool_content li").eq(1).click(function(){
        $(".vipitem_modal").css("visibility", "visible");

        
        
    });
});




$(function(){
    //채널 변경 버튼
    $(".ch_change_btn").click(function(ev){
        ev.preventDefault();
        $(".another_room_modal").css("visibility", "visible");
        $(".ranking_modal").hide();
    });

    $(".another_room_modal .cancel").click(function(ev){
        ev.preventDefault();
        $(".another_room_modal").css("visibility", "hidden");
    });
});


$(function(){
    const rankTabBtn = $(".rank_tab_btn li");
    rankTabBtn.click(function(ev){
        ev.preventDefault();
        let idx = $(this).index();
        
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        $(".list_wrap > div").siblings().removeClass("on");
        $(".list_wrap > div").eq(idx).addClass("on");
    });
});


//즉시 수리 팝업
$(function(){
    const nowItemBtn = $(".now_item");
    const repairNow = $(".repair_now");
    nowItemBtn.click(function(ev){
        ev.preventDefault();
        $(".immediately_repair_modal").css("visibility", "visible");
    });

    repairNow.click(function(ev){
        ev.preventDefault();
        $(".repair_modal").css("visibility", "visible");
        $(".repair_modal").css("background", "transparent")
        $(this).parents('.alert_modal').css("visibility", "hidden");
    });
});

// 상점 실버, 골드 구매 버튼 팝업
$(function(){
    const silverPopBtn = $(".vip_silver_wrap");              
    const goldPopBtn = $(".vip_gold_wrap");
    const silverPop = $("#silver_pop");
    const goldPop = $("#gold_pop");

    // const silverBuyBtn = $("#silverPop .buy_btn");
    // const goldBuyBtn = $("#goldPop .buy_btn");


    silverPopBtn.click(function(){
        silverPop.css("visibility", "visible");
    });

    goldPopBtn.click(function(){
        goldPop.css("visibility", "visible");
    });

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
$(function(){
    function shopModalList(number){
        $(".shop_item_buy_modal").css("visibility", "visible")
        $(".pop_title span").eq(number).siblings().removeClass("on");
        $(".pop_title span").eq(number).addClass("on");
        $(".img_wrap img").eq(number).siblings().removeClass("on");
        $(".img_wrap img").eq(number).addClass("on");
    }

    const shopBuyBtn = $(".shop_item_buy");

    for(let i = 0; i < shopBuyBtn.length; i++){
        shopBuyBtn.eq(i).click(function(ev){
            shopModalList(i);
        });    
        
    }

    
});





// 캔슬 버튼
$(function(){
    const cancelBtn = $(".cancel");
    cancelBtn.click(function(){
        $(this).parents(".alert_modal").css("visibility", "hidden");
    });
});
