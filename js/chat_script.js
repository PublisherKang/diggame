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


});