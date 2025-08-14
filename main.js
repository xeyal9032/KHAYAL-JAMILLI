// Tema
const html = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') html.classList.add('light');
document.getElementById('theme')?.addEventListener('click', () => {
  html.classList.toggle('light');
  localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
});

// Vaka çalışmaları
(async function(){
  try {
    const res = await fetch('cases.data.js');
    const txt = await res.text();
    const data = JSON.parse(txt.replace(/^window\.CASES\s*=\s*/,'').trim());
    const el = document.getElementById('cases');
    data.forEach(c => {
      const article = document.createElement('article');
      article.className = 'card';
      article.innerHTML = `
        <img src="${c.image}" alt="${c.title} ekran görüntüsü" loading="lazy">
        <h3>${c.title}</h3>
        <p>${c.summary}</p>
        <div class="metrics">
          ${c.metrics.map(m=>`<span>${m}</span>`).join('')}
        </div>
        <div class="tags">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="actions" style="margin-top:.6rem;display:flex;gap:.6rem;flex-wrap:wrap">
          ${c.demo ? `<a class="cta" href="${c.demo}" target="_blank" rel="noopener">Demo</a>` : ''}
          ${c.code ? `<a class="ghost" href="${c.code}" target="_blank" rel="noopener">Kod</a>` : ''}
          ${c.brief ? `<a class="ghost" href="${c.brief}" target="_blank" rel="noopener">Vaka Özeti</a>` : ''}
        </div>
      `;
      el.appendChild(article);
    });
  } catch (e) { console.error(e); }
})();

// İletişim formu
document.querySelector('form#contact')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const status = document.getElementById('status');
  status.textContent = 'Gönderiliyor...';
  const fd = new FormData(form);
  try {
    const resp = await fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
    if (resp.ok) {
      status.textContent = 'Teşekkürler! 24 saat içinde dönüş yapacağım.';
      form.reset();
    } else {
      status.textContent = 'Bir sorun oluştu. Lütfen e-posta gönderin: xeyalcemilli9032@gmail.com';
    }
  } catch (err) {
    status.textContent = 'Ağ hatası. Daha sonra tekrar deneyin.';
  }
});
