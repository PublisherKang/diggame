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