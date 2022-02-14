// 인벤토리 팝업
$(function(){
    const invenPopBtn = $(".inventory_btn");
    const backBtn = $(".back_btn");
    const shopPopBtn = $(".shop_btn");
    
    // 인벤 팝업
    invenPopBtn.click(function(ev){
        ev.preventDefault();
        $(".inven_popup").css("visibility", "visible");
        $(".ranking_popup").hide();
        $(".another_room_popup").css("visibility", "hidden");
    });

    // 샵 팝업
    shopPopBtn.click(function(ev){
        ev.preventDefault();
        $(".shop_popup").css("visibility", "visible");
        $(".package_content").css("visibility", "visible");
        $(".ranking_popup").hide();
        $(".shop_menu_btn li").eq(0).addClass("on")
        $(".another_room_popup").css("visibility", "hidden");
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
    });
});

$(function(){
    //아이템 추가하기
    const invenItemList = $(".item_list ul li");
    const targetListSpan = $(".item_list ul li span");                  
    const previewItem = $(".preview_item");
    
    invenItemList.click(function(){
        let cloneThis = $(this).clone();
        targetListSpan.removeClass("target_img");
        $(this).find(targetListSpan).addClass("target_img");
        previewItem.append(cloneThis);
        
    
        //this 아이템 클릭시 해당 span 삭제 자식 요소 삭제
        previewItem.children().first().remove();
        previewItem.children().first().find("span").remove();


        // =====================
        const itemAttr = $(this).children().attr("src");
        console.log(itemAttr);

        let itemArray = [
            "images/item/booster_10m.png",
            "images/item/booster_1h.png",
            "images/item/auto_click_10m.png",
            "images/item/auto_click_1h.png",
        ]
        
        if(itemAttr === itemArray[1]){
            $(this).addClass("aa");
        }


    });
    // console.log(previewItem.children().first());
});

$(function(){
    // repair 팝업
    const repairBtn = $(".btn_wrap .repair");
    const repairPop = $(".repair_popup");
    const repairCancelBtn = $(".repair_popup .cancel");
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
        $(".inven_popup").css("visibility", "hidden");
        $(".shop_popup").css("visibility", "visible");
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
        $(".ranking_popup").show();
    });

    $(".ranking_popup").click(function(ev){
        if($(".ranking_popup").is(ev.target)){
            $(".rank_tab_btn li").removeClass("on")
            $(".rank_tab_btn li").eq(0).addClass("on");
            
            $(".ranking_popup").hide();
        }

    });
    
    //랭킹 팝업 닫기
    const rankCloseBtn = $(".ranking_pop_close");
    rankCloseBtn.click(function(ev){
        ev.preventDefault();
        $(".ranking_popup").hide();
    
        $(".rank_tab_btn li").removeClass("on")
        $(".rank_tab_btn li").eq(0).addClass("on");
    
    });
    
});


//샵 마이닝 툴 팝업
$(function(){
    $(".tool_content li").eq(0).click(function(){
        $(".premiumitem_popup").css("visibility", "visible");

    });
    $(".tool_content li").eq(1).click(function(){
        $(".vipitem_popup").css("visibility", "visible");

        
        
    });
});


$(function(){
    //채널 변경 버튼
    $(".ch_change_btn").click(function(ev){
        ev.preventDefault();
        $(".another_room_popup").css("visibility", "visible");
        $(".ranking_popup").hide();
    });

    $(".another_room_popup .cancel").click(function(ev){
        ev.preventDefault();
        $(".another_room_popup").css("visibility", "hidden");
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
        $(".immediately_repair_popup").css("visibility", "visible");
    });

    repairNow.click(function(ev){
        ev.preventDefault();
        $(".repair_popup").css("visibility", "visible");
        $(".repair_popup").css("background", "transparent")
        $(this).parents('.alert_popup').css("visibility", "hidden");
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

$(function(){
    function preBoxOpen(){
        for(let i = 0; i < 10; i++){
            setTimeout(function(){
                $(".pre_open_wrap ul").append("<li>"+ "<img src=images/item/pick_rare.png>" +"</li>");
            },500 * i)
        }
    }
    function vipBoxOpen(){
        for(let i = 0; i < 10; i++){
            setTimeout(function(){
                $(".vip_open_wrap ul").append("<li>"+ "<img src=images/item/pick_rare.png>" +"</li>");
            },500 * i)
        }
    }
});





//샵 아이템 구매 팝업
$(function(){
    function shopPopupList(number){
        $(".shop_item_buy_popup").css("visibility", "visible")
        $(".pop_title span").eq(number).siblings().removeClass("on");
        $(".pop_title span").eq(number).addClass("on");
        $(".img_wrap img").eq(number).siblings().removeClass("on");
        $(".img_wrap img").eq(number).addClass("on");
    }

    const shopBuyBtn = $(".shop_item_buy");

    for(let i = 0; i < shopBuyBtn.length; i++){
        shopBuyBtn.eq(i).click(function(ev){
            shopPopupList(i);
        });    
        
    }

    
});




// 캔슬 버튼
$(function(){
    const cancelBtn = $(".cancel");
    cancelBtn.click(function(){
        $(this).parents(".alert_popup").css("visibility", "hidden");
    });
});
