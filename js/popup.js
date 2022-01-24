// 인벤토리 팝업
$(function(){
    const invenPopBtn = $(".inventory_btn");
    const backBtn = $(".back_btn");
    const shopPopBtn = $(".shop_btn");
    
    // 인벤 팝업
    invenPopBtn.click(function(ev){
        ev.preventDefault();
        $(".inven_popup").css("visibility", "visible");
    });

    // 샵 팝업
    shopPopBtn.click(function(ev){
        ev.preventDefault();
        $(".shop_popup").css("visibility", "visible");
    });

    // Back 버튼
    backBtn.click(function(ev){
        ev.preventDefault();
        $(this).parent().parent().css("visibility", "hidden");
    });
});

$(function(){
    //아이템 추가하기
    const invenItemList = $(".item_list ul li");
    const targetListSpan = $(".item_list ul li span");                  
    const previewItem = $(".preview_itme");
    
    invenItemList.click(function(){
        targetListSpan.removeClass("target_img");
        $(this).find(targetListSpan).addClass("target_img");
        previewItem.append($(this).find("img"));
        
    
        previewItem.children().first().remove();
    });
    console.log(previewItem.children().first());
});

$(function(){
    // repair 팝업
    const repairBtn = $(".btn_wrap .repair");
    const repairPop = $(".repair_popup");
    const repairCancelBtn = $(".repair_popup .cancel");
    repairBtn.click(function(){
        repairPop.css("visibility", "visible");
    });
    repairCancelBtn.click(function(){
        repairPop.css("visibility", "hidden");
    });
});