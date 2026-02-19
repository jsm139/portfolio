// Dark mode toggle with localStorage
(function(){
  const root = document.body;
  const key = 'jm-theme';
  const saved = localStorage.getItem(key);
  if(saved){ root.className = saved; }
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-toggle-theme]');
    if(btn){
      const next = root.classList.contains('theme-light') ? '' : 'theme-light';
      if(next) root.className = 'theme-light'; else root.className = '';
      localStorage.setItem(key, root.className);
    }
  });
})();

// Contact form: open mailto with composed subject/body
(function(){
  const form = document.querySelector('#contact-form');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get('name')||'');
    const email = encodeURIComponent(data.get('email')||'');
    const message = encodeURIComponent(data.get('message')||'');
    const subject = `Portfolio contact from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A---%0A${message}`;
    window.location.href = `mailto:jonathan.mendoza@example.com?subject=${subject}&body=${body}`;
  });
})();
