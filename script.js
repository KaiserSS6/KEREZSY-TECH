document.addEventListener("DOMContentLoaded",()=>{

  const cart = JSON.parse(localStorage.getItem("kcart")||"[]");
  const count = cart.reduce((s,i)=>s+(i.qty||1),0);
  const elCount = document.getElementById("cartCount"); if(elCount) elCount.textContent = count;


  (function(){
    const THEME_KEY = 'ktheme';
    function setIcon(mode){
      const icon = document.getElementById('themeIcon'); if(!icon) return;
      if(mode==='light'){
        icon.innerHTML = '<path d="M6.76 4.84l-1.8-1.79L3.17 4.83l1.79 1.79 1.8-1.78zM1 13h3v-2H1v2zm10 8h2v-3h-2v3zm8.83-16.96l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79zM17.24 19.16l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM20 13v-2h3v2h-3zM12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor"/>';
      } else {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>';
      }
    }
    function applyTheme(mode){
      if(mode==='light') document.body.classList.add('light-mode'); else document.body.classList.remove('light-mode');
      const btn = document.getElementById('themeToggle'); if(btn) btn.setAttribute('aria-pressed', mode==='light'?'true':'false');
      setIcon(mode);
    }
    const stored = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(stored);
    document.addEventListener('click', function(e){
      const t = e.target.closest ? e.target.closest('#themeToggle') : null; if(!t) return;
      const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  })();

 
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let idx = slides.findIndex(s=>s.classList.contains('active'));
  if(idx<0) idx = 0;
  let interval = null;
  function show(i){
    slides.forEach((s,si)=> s.classList.toggle('active', si===i));
  }

  if(slides.length>0) show(idx);
  function next(){ idx = (idx+1) % slides.length; show(idx); }
  function prev(){ idx = (idx-1 + slides.length) % slides.length; show(idx); }
  function start(){ if(interval) clearInterval(interval); interval = setInterval(next,5000); }
  function stop(){ if(interval) clearInterval(interval); interval = null; }
  if(nextBtn) nextBtn.addEventListener('click', ()=>{ next(); start(); });
  if(prevBtn) prevBtn.addEventListener('click', ()=>{ prev(); start(); });
  slides.forEach(s=>{ s.addEventListener('mouseenter', stop); s.addEventListener('mouseleave', start); });
  if(slides.length>0) start();


  const chatForm = document.getElementById('chatForm');
  const messages = document.getElementById('messages');
  if(chatForm && messages){
    chatForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const input = document.getElementById('msgInput');
      const v = input.value.trim(); if(!v) return;
      const userMsg = document.createElement('div'); userMsg.className='msg user'; userMsg.textContent = v; messages.appendChild(userMsg);
      input.value=''; messages.scrollTop = messages.scrollHeight;
            setTimeout(()=>{
        const srv = document.createElement('div');
        srv.className = 'msg support';
        srv.innerHTML = 'Gracias por contactarnos. Por el momento gestionamos presupuestos, asesoramiento y soporte principalmente a través de nuestras redes sociales para brindar una atención ágil y personalizada. Escríbenos por favor en: <a href="https://www.instagram.com/KerezsyTech" target="_blank" rel="noopener noreferrer">Instagram</a>, <a href="https://www.facebook.com/KerezsyTech" target="_blank" rel="noopener noreferrer">Facebook</a>, <a href="https://x.com/KerezsyTech" target="_blank" rel="noopener noreferrer">X</a> o por WhatsApp: <a href="https://wa.me/584241976275" target="_blank" rel="noopener noreferrer">+58 424-197-6275</a>.';
        messages.appendChild(srv);
        messages.scrollTop = messages.scrollHeight;
      },900);
    });
  }

 
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();


  const catPrev = document.getElementById('catPrev');
  const catNext = document.getElementById('catNext');
  const catList = document.querySelector('.category-list');
  if(catPrev && catNext && catList){
    const step = 220; // pixels per click
    catPrev.addEventListener('click', ()=>{ catList.scrollBy({left:-step,behavior:'smooth'}); });
    catNext.addEventListener('click', ()=>{ catList.scrollBy({left:step,behavior:'smooth'}); });

  
    function updateCatButtons(){
      catPrev.disabled = catList.scrollLeft <= 0;
      catNext.disabled = Math.ceil(catList.scrollLeft + catList.clientWidth) >= catList.scrollWidth;
      catPrev.style.opacity = catPrev.disabled? '0.45':'1';
      catNext.style.opacity = catNext.disabled? '0.45':'1';
    }
    catList.addEventListener('scroll', updateCatButtons);
    window.addEventListener('resize', updateCatButtons);
    updateCatButtons();
  }

  
  (function updateAuthUI(){
    try{
      const u = JSON.parse(localStorage.getItem('kuser')||'null');
      document.querySelectorAll('.nav-right').forEach(nr=>{
        const loginLink = nr.querySelector('a[href="login.html"]');
        if(u){
          if(loginLink) loginLink.remove();

      
          if(nr.querySelector('.user-area')) return;
          const ua = document.createElement('div'); ua.className='user-area';
          ua.style.display='flex'; ua.style.gap='8px'; ua.style.alignItems='center';
          const nameSpan = document.createElement('span'); nameSpan.className='user-name'; nameSpan.textContent = u.name || u.email || 'Usuario'; nameSpan.style.color='var(--white)'; nameSpan.style.fontWeight='600';
          const logout = document.createElement('a'); logout.className='nav-icon'; logout.href='#'; logout.id='logoutBtn'; logout.title='Cerrar sesión';
          logout.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" fill="currentColor"/></svg>';
          ua.appendChild(nameSpan); ua.appendChild(logout); nr.appendChild(ua);
        } else {
          
         
          if(!loginLink){
            const a = document.createElement('a'); a.className='nav-icon'; a.href='login.html'; a.title='Iniciar sesión'; a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z"/></svg>';
            nr.appendChild(a);
          }
        }
      });
      const out = document.getElementById('logoutBtn'); if(out) out.addEventListener('click',(e)=>{e.preventDefault(); localStorage.removeItem('kuser'); location.reload();});
    }catch(e){console.warn(e)}
  })();
});


function showAddConfirmation(title, message){
  try{
    let m = document.getElementById('confirmModal');
    if(!m){
      m = document.createElement('div'); m.id='confirmModal'; m.className='confirm-modal'; m.setAttribute('aria-live','polite');
      m.innerHTML=`<div class="icon"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor"></path></svg></div><div class="text"><div class="title">Agregado al carrito</div><div id="confirmMsg"></div></div>`;
      document.body.appendChild(m);
    }
    const titleEl = m.querySelector('.title');
    const msgEl = m.querySelector('#confirmMsg');
    if(titleEl) titleEl.textContent = title || 'Confirmado';
    if(msgEl) msgEl.textContent = message || '';
    m.style.display='flex'; m.classList.add('show');
    setTimeout(()=>{m.classList.remove('show');},2600);
  }catch(e){console.warn(e)}
}

