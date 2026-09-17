const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.primary-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const form=document.querySelector('[data-contact-form]');
if(form){
  const status=form.querySelector('.form-status');
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    status.textContent='Sending…';
    const payload=Object.fromEntries(new FormData(form).entries());
    try{
      const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(data.error||'Unable to send your message.');
      form.reset();
      status.textContent='Thank you. Your enquiry has been submitted.';
    }catch(err){
      status.textContent='Online delivery is not yet configured. Please email info@finbus.org or call 08077928659.';
    }
  });
}


// Informational cookie notice: necessary technologies only at launch.
(function(){
  const key='finbus-cookie-notice-seen-v1';
  if (localStorage.getItem(key)) return;
  const el=document.createElement('div');
  el.id='finbus-cookie-notice';
  el.className='cookie-notice';
  el.setAttribute('role','region');
  el.setAttribute('aria-label','Cookie notice');
  el.innerHTML='<div><strong>Website technology notice</strong><p>Finbus currently uses no non-essential analytics or advertising cookies. Necessary technologies may be used to deliver and protect this website. <a href="cookies.html">Read the Cookie Notice</a>.</p></div><button type="button" class="btn btn-green">Got it</button>';
  el.querySelector('button').addEventListener('click',()=>{localStorage.setItem(key,'1');el.remove();});
  document.body.appendChild(el);
})();
