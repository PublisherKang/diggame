(function(){
  const gnbList = document.querySelectorAll(".gnb li");

  [...gnbList].forEach( (ev, idx) => {
    // ev.addEventListener("mouseenter");
    
  });
}());

(function(){
  const comming = document.querySelector(".comming");
  const commingA = document.querySelector(".comming a");

  commingA.addEventListener("mouseenter", function(ev){
    ev.preventDefault();
    this.innerHTML = "Comming Soon";
    comming.classList.add("text_change");
    // console.log(this.children);
  });
  
  commingA.addEventListener("mouseleave", function(ev){
    ev.preventDefault();
    this.innerHTML = "Market";
    comming.classList.remove("text_change");
    // console.log(this.children);
  });
  
}());


// 모바일 메뉴 열기
(function(){
  const mobileGnbBtn = document.querySelector(".menu_btn");
  const mobileSlideMenu = document.querySelector(".mobi_side");
  const mobileSlideMenuBg = document.querySelector(".side_bg");
  const closeSide = document.querySelector(".mobi_side .overlay");
  console.log(closeSide);

  mobileGnbBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    
    mobileSlideMenu.style.visibility = "visible";
    mobileSlideMenuBg.style.transform = "translateX(0)";

    document.querySelector("body").classList.add("stop-scroll");
  });

  closeSide.addEventListener("click", (ev) => {
    mobileSlideMenuBg.style.transform = "translateX(-100%)";
    mobileSlideMenu.style.visibility = "hidden";
    document.querySelector("body").classList.remove("stop-scroll");
  });

}());


// gameStartView();
// function gameStartView(){
//   const startBtn = document.querySelector(".start_btn");
//   // let sectionScroll = contSection.getBoundingClientRect().top;
  
//   // console.log(sectionScroll);
  
//   const contSection = document.querySelector(".cont2");
//   console.log(contSection.scrollTop);
  
//   document.addEventListener('scroll', function(ev){
//     // const windowTop = this.scrollTop;
//     // console.log(this.clientTop);
//     console.log(this.offsetTop);
//     // if(sectionScroll < 0){
//     //   startBtn.style.transform = "translateX(0)";
//     // }
//   });
  
// }

$(window).scroll(function(){
  const thisScrT = $(this).scrollTop();
  const section2 = $(".cont2").offset().top;
  const startBtn = $(".start_btn");
  console.log(thisScrT);
  console.log(section2);
  if(thisScrT > section2){
    startBtn.css("transform", "translateX(0)");
  }else{
    startBtn.css({
      "transform": "translateX(100%)",
    });
  }
});