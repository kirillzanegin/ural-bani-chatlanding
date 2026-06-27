import fs from 'node:fs'
import path from 'node:path'
import { articles } from '../src/data/articles.js'
import { extraArticles } from '../src/data/extraArticles.js'
import { moreArticles } from '../src/data/moreArticles.js'
import { comfortArticles } from '../src/data/comfortArticles.js'
import { spaceArticles } from '../src/data/spaceArticles.js'
import { sitePrepArticles } from '../src/data/sitePrepArticles.js'
import { knowledgeItems } from '../src/data/knowledge.js'

const SITE_URL = 'https://бани-урала.рф'
const BUILD_DATE = '2026-06-28'
const distDir = path.resolve('dist')
const allArticles = [...articles, ...extraArticles, ...moreArticles, ...comfortArticles, ...spaceArticles, ...sitePrepArticles]

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function articleDescription(article) {
  const item = knowledgeItems.find((entry) => entry.slug === article.slug)
  return article.summary || item?.description || article.lead || article.title
}

function renderList(items = []) {
  if (!items?.length) return ''
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
}

function renderCards(cards = []) {
  if (!cards?.length) return ''
  return `<div class="cards">${cards.map((card) => `
    <section class="card">
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.text)}</p>
    </section>
  `).join('')}</div>`
}

function renderTable(rows = []) {
  if (!rows?.length) return ''
  return `<div class="table">${rows.map(([first, second, third]) => `
    <div class="table-row">
      <strong>${escapeHtml(first)}</strong>
      <span>${escapeHtml(second)}</span>
      <p>${escapeHtml(third)}</p>
    </div>
  `).join('')}</div>`
}

function renderScheme(items = []) {
  if (!items?.length) return ''
  return `<ol class="scheme">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol>`
}

function renderArticleHtml(article) {
  const canonical = `${SITE_URL}/articles/${article.slug}/`
  const description = articleDescription(article)
  const previousNext = knowledgeItems
    .filter((item) => item.isReady && item.slug !== article.slug)
    .slice(0, 4)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description,
    author: {
      '@type': 'Organization',
      name: 'Бани Урала',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Бани Урала',
      url: SITE_URL,
    },
    mainEntityOfPage: canonical,
    dateModified: BUILD_DATE,
    inLanguage: 'ru-RU',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'База знаний',
        item: `${SITE_URL}/#knowledge`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonical,
      },
    ],
  }

  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(article.title)} - Бани Урала</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="og:site_name" content="Бани Урала" />
  <meta property="og:title" content="${escapeHtml(article.title)} - Бани Урала" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE_URL}/hero-bath-bg.webp" />
  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
  <script type="text/javascript">
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=110205159','ym');
    ym(110205159,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
  </script>
  <style>
    :root{color-scheme:light;--bg:#f7f1e8;--paper:#fffaf3;--text:#241c15;--muted:#6e6258;--accent:#9a5b2f;--line:#e0d2c0}*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.65}.container{width:min(1120px,calc(100% - 32px));margin:0 auto}.header{position:sticky;top:0;z-index:5;background:rgba(255,250,243,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}.header-inner{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:20px}.logo{font-weight:800;font-size:22px;color:var(--text);text-decoration:none}.nav{display:flex;gap:18px;flex-wrap:wrap}.nav a{color:var(--muted);text-decoration:none}.button{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:14px 20px;background:var(--text);color:#fff;text-decoration:none;font-weight:700}.hero{padding:76px 0 42px}.eyebrow{text-transform:uppercase;letter-spacing:.12em;color:var(--accent);font-weight:800;font-size:13px}h1{font-size:clamp(34px,5vw,64px);line-height:1.05;margin:10px 0 18px}h2{font-size:clamp(26px,3vw,38px);line-height:1.16;margin:42px 0 14px}h3{font-size:20px;line-height:1.25}.lead{font-size:22px;max-width:860px;color:var(--muted)}.meta{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}.meta span{border:1px solid var(--line);border-radius:999px;padding:8px 12px;background:rgba(255,255,255,.55)}.layout{display:grid;grid-template-columns:270px 1fr;gap:40px;align-items:start}.toc{position:sticky;top:96px;background:var(--paper);border:1px solid var(--line);border-radius:24px;padding:20px}.toc a{display:block;color:var(--muted);text-decoration:none;margin:12px 0}.content{background:var(--paper);border:1px solid var(--line);border-radius:28px;padding:clamp(22px,4vw,48px)}.content p{font-size:18px}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:24px 0}.card,.final{background:#fff;border:1px solid var(--line);border-radius:22px;padding:20px}.table{display:grid;gap:12px;margin:24px 0}.table-row{display:grid;grid-template-columns:160px 1fr 1.4fr;gap:18px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:16px}.table-row p{margin:0}.scheme{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;padding:0;list-style:none}.scheme li{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px;font-weight:700}blockquote{border-left:4px solid var(--accent);padding-left:18px;color:var(--muted);font-size:20px}.final{margin-top:40px}.related{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin-top:20px}.related a{display:block;background:#fff;border:1px solid var(--line);border-radius:18px;padding:16px;color:var(--text);text-decoration:none;font-weight:700}.footer{margin-top:70px;padding:32px 0;color:var(--muted);border-top:1px solid var(--line)}@media(max-width:860px){.layout{grid-template-columns:1fr}.toc{position:static}.table-row{grid-template-columns:1fr}.header-inner{align-items:flex-start;flex-direction:column;padding:16px 0}}
  </style>
</head>
<body>
  <noscript><div><img src="https://mc.yandex.ru/watch/110205159" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
  <header class="header"><div class="container header-inner"><a class="logo" href="/">Бани Урала</a><nav class="nav"><a href="/#formats">Форматы</a><a href="/#layouts">Планировки</a><a href="/#cost">Стоимость</a><a href="/#knowledge">База знаний</a><a class="button" href="/#feedback">Рассчитать</a></nav></div></header>
  <main>
    <section class="hero"><div class="container"><p class="eyebrow">${escapeHtml(article.eyebrow)}</p><h1>${escapeHtml(article.title)}</h1><p class="lead">${escapeHtml(article.lead)}</p><div class="meta"><span>${escapeHtml(article.readingTime)}</span><span>Практическая статья</span></div></div></section>
    <section><div class="container layout"><aside class="toc"><strong>В статье</strong>${article.sections.map((section) => `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.title)}</a>`).join('')}</aside><article class="content">
      ${(article.intro || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      ${article.sections.map((section) => `<section id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.title)}</h2>${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${renderCards(section.cards)}${renderTable(section.table)}${renderScheme(section.scheme)}${renderList(section.checklist)}${section.quote ? `<blockquote>${escapeHtml(section.quote)}</blockquote>` : ''}</section>`).join('')}
      <section class="final"><p class="eyebrow">Чек-лист</p><h2>Что понять перед заказом проекта</h2>${renderList(article.finalChecklist)}<a class="button" href="/#feedback">Обсудить баню с менеджером</a></section>
    </article></div></section>
    <section><div class="container"><h2>Другие материалы</h2><div class="related">${previousNext.map((item) => `<a href="/articles/${item.slug}/">${escapeHtml(item.title)}</a>`).join('')}</div></div></section>
  </main>
  <footer class="footer"><div class="container">Бани Урала - отдельно стоящие бани под ключ на Урале</div></footer>
</body>
</html>`
}

function renderSitemap() {
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    ...allArticles.map((article) => ({ loc: `${SITE_URL}/articles/${article.slug}/`, priority: '0.8' })),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`
}

for (const article of allArticles) {
  const articleDir = path.join(distDir, 'articles', article.slug)
  fs.mkdirSync(articleDir, { recursive: true })
  fs.writeFileSync(path.join(articleDir, 'index.html'), renderArticleHtml(article), 'utf8')
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), renderSitemap(), 'utf8')
fs.writeFileSync(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf8')

console.log(`Generated ${allArticles.length} SEO article pages and sitemap.xml`)
