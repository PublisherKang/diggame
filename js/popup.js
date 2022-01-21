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

});