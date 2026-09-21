/* 마을장의사 방문 통계 — 구글 애널리틱스(GA4)
   측정 ID가 비어 있으면 아무 일도 하지 않는다. 이름·연락처 등 개인정보는 보내지 않는다. */
(function(){
  var GA_ID='G-5WFBWV7NKF'; // 예: 'G-XXXXXXXXXX' — 애널리틱스 속성을 만든 뒤 여기에 넣는다
  if(!GA_ID)return;
  var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag=gtag;
  gtag('js',new Date());
  gtag('config',GA_ID,{allow_google_signals:false,allow_ad_personalization_signals:false});

  function page(){var p=location.pathname.replace(/\.html$/,'');return p===''?'/':p;}
  // 다른 스크립트(미리 준비 등)에서 부를 수 있는 공용 함수
  window.mjTrack=function(name,params){try{var o=params||{};o.page=page();gtag('event',name,o);}catch(e){}};

  // 전화·카카오톡·네이버 톡톡 버튼 클릭
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;
    var h=a.getAttribute('href')||'';
    if(h.indexOf('tel:')===0){window.mjTrack('call_click',{number:h.replace('tel:','')});}
    else if(h.indexOf('pf.kakao.com')!==-1){window.mjTrack('kakao_click',{});}
    else if(h.indexOf('talk.naver.com')!==-1){window.mjTrack('talktalk_click',{});}
  },true);
})();
