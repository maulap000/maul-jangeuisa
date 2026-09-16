(function(){
  var btn=document.querySelector('.talktalk-float');
  if(!btn)return;
  var threshold=Math.min(window.innerHeight*0.6,480);
  function update(){
    var hide=window.scrollY<threshold;
    btn.classList.toggle('tt-hide',hide);
    btn.setAttribute('aria-hidden',hide?'true':'false');
  }
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',function(){threshold=Math.min(window.innerHeight*0.6,480);update();});
  update();
})();
