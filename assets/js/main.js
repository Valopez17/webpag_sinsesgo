/* Sin Sesgo — comportamiento del sitio
   1) Entradas animadas  2) Menú, acordeón y formulario  3) Hero: fotografías y encabezado */

// 1) Entradas animadas (titulares por palabra, bloques y grupos en cascada)
//    Si algo falla, se retira la clase "js" y todo el contenido queda visible.
(function(){
 window.__ss=1;
 var root=document.documentElement;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){root.classList.remove('js');return}
 try{
  var splitWords=function(el){var i=0;
   (function walk(n){Array.prototype.slice.call(n.childNodes).forEach(function(c){
    if(c.nodeType===3){var f=document.createDocumentFragment();
     c.textContent.split(/(\s+)/).forEach(function(t){
      if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(' '));return}
      var w=document.createElement('span');w.className='sw';w.setAttribute('aria-hidden','true');
      var s=document.createElement('span');s.textContent=t;s.style.setProperty('--i',i++);w.appendChild(s);f.appendChild(w)});
     c.parentNode.replaceChild(f,c)}
    else if(c.nodeType===1)walk(c)})})(el)};
  document.querySelectorAll('[data-split]').forEach(function(el){el.setAttribute('aria-label',el.textContent.replace(/\s+/g,' ').trim());splitWords(el)});
  document.querySelectorAll('[data-stagger]').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.style.setProperty('--i',i)})});
  var tg=Array.prototype.slice.call(document.querySelectorAll('[data-split],[data-r],[data-stagger]'));
  // retraso escalonado (100 ms) entre elementos hermanos: kicker, título, descripción…
  tg.forEach(function(el){var p=el.parentNode,n=p.__n||0;p.__n=n+1;el.style.setProperty('--d',Math.min(n,3)*100+'ms')});
  if('IntersectionObserver' in window){
   var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting||e.boundingClientRect.top<0){e.target.classList.add('is-in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
   tg.forEach(function(el){io.observe(el)})}
  else tg.forEach(function(el){el.classList.add('is-in')});
 }catch(err){root.classList.remove('js')}
})();

// 2) Interfaz
(function(){
 var mb=document.querySelector('.menu-btn'),ul=document.getElementById('menu');
 function setMenu(o){ul.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.textContent=o?'Cerrar':'Menú';document.body.style.overflow=o?'hidden':''}
 mb.onclick=function(){setMenu(!ul.classList.contains('open'))};
 ul.onclick=function(e){if(e.target.closest('a'))setMenu(false)};
 addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
 document.querySelectorAll('.svc>button').forEach(function(b){b.onclick=function(){var s=b.parentElement,o=s.dataset.open!=='true';s.dataset.open=o;b.setAttribute('aria-expanded',o)}});
 // form (prototype, no network)
 document.getElementById('cf').onsubmit=function(e){e.preventDefault();var f=e.target,ok=document.getElementById('ok');
  if(!f.n.value.trim()||!/\S+@\S+\.\S+/.test(f.e.value)){ok.textContent='Escribe tu nombre y un correo válido para continuar.';return}
  ok.textContent='Gracias, '+f.n.value.trim()+'. En la versión final tu mensaje llegará al equipo.';f.reset()};

})();

(function(){
 var hd=document.querySelector('header'),hero=document.getElementById('hero');
 function sc(){hd.classList.toggle('solid',scrollY>hero.offsetHeight-90)}addEventListener('scroll',sc,{passive:true});addEventListener('resize',sc);sc();
 var S=[].slice.call(hero.querySelectorAll('.s')),W=['México','la Gen Z','los compradores'],vw=document.getElementById('vw'),pz=document.getElementById('pz'),i=0,paused=false,t;
 function go(){var n=(i+1)%S.length;S[i].classList.remove('on');S[n].classList.add('on');
  vw.classList.add('out');setTimeout(function(){vw.textContent=W[n];vw.classList.remove('out');vw.classList.add('pre');void vw.offsetWidth;vw.classList.remove('pre')},280);i=n}
 function loop(){clearTimeout(t);if(paused||document.hidden)return;t=setTimeout(function(){go();loop()},4500)}
 pz.onclick=function(){paused=!paused;pz.textContent=paused?'▶':'❚❚';pz.setAttribute('aria-label',paused?'Reanudar la secuencia de fotografías':'Pausar la secuencia de fotografías');loop()};
 document.addEventListener('visibilitychange',loop);loop();
})();
