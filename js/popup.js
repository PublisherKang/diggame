$(document).ready(function(){
    // button false
    // 인벤토리 팝업
    const invenPopBtn = $(".inventory_btn");
    const backBtn = $(".back_btn");

    invenPopBtn.click(function(ev){
        ev.preventDefault();
        $(".inven_popup").show();
    });

    // Back 버튼
    backBtn.click(function(ev){
        ev.preventDefault();
        $(this).parent().parent().hide();
    });


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


    // repair 팝업
    const repairBtn = $(".btn_wrap .repair");
    const repairPop = $(".repair_popup");
    const repairCancelBtn = $(".repair_popup .cancel");
    repairBtn.click(function(){
        repairPop.show();
    });
    repairCancelBtn.click(function(){
        repairPop.hide();
    });
});