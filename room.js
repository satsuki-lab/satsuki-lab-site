(()=>{
 const safeStorage={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,val){try{localStorage.setItem(key,val)}catch{}}};
 const visitEl=document.getElementById('visit-count');
 if(visitEl){let value=Number(safeStorage.get('satsuki-room-visits')||0)+1;value=Math.min(value,999999);safeStorage.set('satsuki-room-visits',String(value));visitEl.textContent=String(value).padStart(6,'0');}
 const themes=['pink','mint','sky'];const chosen=safeStorage.get('satsuki-room-theme');if(themes.includes(chosen))document.body.dataset.theme=chosen;
 function updateThemeButtons(){document.querySelectorAll('[data-theme-select]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeSelect===(document.body.dataset.theme||'pink'))));}
 document.querySelectorAll('[data-theme-select]').forEach(button=>button.addEventListener('click',()=>{const theme=button.dataset.themeSelect;if(!themes.includes(theme))return;document.body.dataset.theme=theme;safeStorage.set('satsuki-room-theme',theme);updateThemeButtons();}));updateThemeButtons();
 const current=new Date();let viewYear=current.getFullYear(),viewMonth=current.getMonth();const grid=document.getElementById('calendar-body'),monthLabel=document.getElementById('calendar-month');
 const weekday=['日','月','火','水','木','金','土'];
 function renderCalendar(){if(!grid||!monthLabel)return;monthLabel.textContent=`${viewYear}.${String(viewMonth+1).padStart(2,'0')}`;grid.replaceChildren();const firstDay=new Date(viewYear,viewMonth,1).getDay(),days=new Date(viewYear,viewMonth+1,0).getDate();let day=1;for(let row=0;row<6;row++){const tr=document.createElement('tr');for(let col=0;col<7;col++){const td=document.createElement('td');const pos=row*7+col;if(pos>=firstDay&&day<=days){td.textContent=day;if(viewYear===current.getFullYear()&&viewMonth===current.getMonth()&&day===current.getDate()){td.className='today';td.setAttribute('aria-label','今日');}day++;}else{td.className='inactive';td.textContent='·';}tr.appendChild(td);}grid.appendChild(tr);if(day>days)break;}}
 document.querySelector('[data-cal-prev]')?.addEventListener('click',()=>{viewMonth--;if(viewMonth<0){viewMonth=11;viewYear--;}renderCalendar();});
 document.querySelector('[data-cal-next]')?.addEventListener('click',()=>{viewMonth++;if(viewMonth>11){viewMonth=0;viewYear++;}renderCalendar();});renderCalendar();
 const dateEl=document.getElementById('today-date');if(dateEl)dateEl.textContent=`${current.getFullYear()}年${current.getMonth()+1}月${current.getDate()}日`;
})();
