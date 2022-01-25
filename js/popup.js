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
    });

    // 샵 팝업
    shopPopBtn.click(function(ev){
        ev.preventDefault();
        $(".shop_popup").css("visibility", "visible");
        $(".package_content").css("visibility", "visible");
        $(".ranking_popup").hide();
        $(".shop_menu_btn li").eq(0).addClass("on")
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
        targetListSpan.removeClass("target_img");
        $(this).find(targetListSpan).addClass("target_img");
        previewItem.append($(this).find("img"));
        
    
        previewItem.children().first().remove();
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
    const rankingBtn = $(".cont_ranking");
    rankingBtn.click(function(ev){
        ev.preventDefault();
        $(".ranking_popup").show();
    });
});


$(function(){
    //랭킹 팝업 닫기
    const rankCloseBtn = $(".ranking_pop_close");
    rankCloseBtn.click(function(ev){
        ev.preventDefault();
        $(".ranking_popup").hide();
    });
});

$(function(){
    $(".ch_change_btn").click(function(ev){
        ev.preventDefault();
        $(".another_room_popup").show();
    });

    $(".another_room_popup .cancel").click(function(ev){
        ev.preventDefault();
        $(".another_room_popup").hide();
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