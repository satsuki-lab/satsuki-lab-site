(()=>{
 const menuButton=document.querySelector('[data-menu-toggle]');
 const menu=document.querySelector('[data-nav]');
 if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');menuButton.textContent=open?'×':'☰';});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));}
 const filters=[...document.querySelectorAll('[data-filter]')];
 if(filters.length){const cards=[...document.querySelectorAll('[data-category]')];
 const applyFilter=category=>{filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));cards.forEach(card=>{card.hidden=category!=='all'&&!card.dataset.category.split(' ').includes(category)});};
 filters.forEach(b=>b.addEventListener('click',()=>applyFilter(b.dataset.filter)));
 const hash=location.hash.replace('#','');const target=hash&&document.getElementById(hash);
 if(target&&target.dataset.category){const category=target.dataset.category.split(' ')[0];applyFilter('all');}
 }
})();
