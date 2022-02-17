$(document).ready(function(){
    
    //이모티콘 버튼 클릭했을때 이모티콘 wrap 활성화
    const emoticonBtn = $(".emoticon_btn button");

    emoticonBtn.click(function(){
        $(".emoticon_wrap").toggle({});
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

            $(".chat_inner").animate({
                "height" : "98.4375vw",
            },500);

            $(this).hide();
            roomCloseBtn.show();
        });

        roomCloseBtn.click(function(){
            $(".chat_wrap_in").animate({
                "height" : "100%",
                "top" : "0"

            },500);

            $(".chat_inner").animate({
                "height" : "29.55034vw",
            },500);

            $(this).hide();
            roomOpenBtn.show();
        });
    });


    
});
