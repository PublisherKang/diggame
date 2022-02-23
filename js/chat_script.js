$(document).ready(function(){
    
    //이모티콘 버튼 클릭했을때 이모티콘 wrap 활성화
    const chatEmoticonBtn = $(".chat_wrap .emoticon_btn button");
    const tradeEmoticonBtn = $(".trade_modal .emoticon_btn button");

    chatEmoticonBtn.click(function(){
        $(".chat_wrap .emoticon_wrap").toggle({});
    });

    tradeEmoticonBtn.click(function(){
        $(".trade_modal .emoticon_wrap").toggle({});
    });


    // 이모티콘 배열 추가
    emoticonList();
    function emoticonList(){
        const emoticonEleUl = $(".emoticon_wrap ul");

        for(let i = 1; i <= 60; i++){
            emoticonEleUl.append("<li>" + "<button>" + "<img src=images/imoticon/imoticon" + i + ".png>" + "</button>" + "</li>").eq(i);
        }
    }



    //채팅창 크기 늘어남
    $(function(){
        const roomOpenBtn = $(".room_number .chat_open");
        const roomCloseBtn = $(".room_number .chat_close");
        
        roomOpenBtn.click(function(){
            $(".chat_wrap_in").animate({
                "height" : "123.75vw",
                "top" : "-68.75vw"

            },500);

            //채팅 창 맨 아래로 위치
            $(".chat_inner").animate({
                "height" : "98.4375vw",
                scrollTop: $(".message_inner").height(),
            },500);

            $(this).hide();
            roomCloseBtn.show();
            
        });

        roomCloseBtn.click(function(){
            $(".chat_wrap_in").animate({
                "height" : "100%",
                "top" : "0",
            },0);

            //채팅 창 맨 아래로 위치
            $(".chat_inner").animate({
                "height" : "29.55034vw",
                scrollTop: $(".message_inner").height(),
            },0);

            $(this).hide();
            roomOpenBtn.show();
        });
    });


    $(".user_ch").click(function(){
        $(this).parents(".user_message").siblings().find(".user_menu").removeClass("on");

        $(this).siblings(".user_menu").toggleClass("on");
    });


    
});
