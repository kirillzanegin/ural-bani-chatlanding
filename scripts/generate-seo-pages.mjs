import fs from 'node:fs'
import path from 'node:path'
import { articles } from '../src/data/articles.js'
import { extraArticles } from '../src/data/extraArticles.js'
import { moreArticles } from '../src/data/moreArticles.js'
import { comfortArticles } from '../src/data/comfortArticles.js'
import { spaceArticles } from '../src/data/spaceArticles.js'
import { sitePrepArticles } from '../src/data/sitePrepArticles.js'
import { knowledgeItems } from '../src/data/knowledge.js'
import { seoLandings } from '../src/data/seoLandings.js'
import { faqItems } from '../src/data/faq.js'
import { getLandingEnhancement } from '../src/data/landingEnhancements.js'

const SITE_URL = 'https://бани-урала.рф'
const BUILD_DATE = '2026-06-28'
const distDir = path.resolve('dist')
const allArticles = [...articles, ...extraArticles, ...moreArticles, ...comfortArticles, ...spaceArticles, ...sitePrepArticles]
const appShell = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')

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

function makeBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

function makeFaqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function injectMeta(shell, { title, description, canonical, type = 'website', schema = '' }) {
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/\>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link\s+rel="canonical"[\s\S]*?\/\>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta\s+property="og:type"[\s\S]*?\/\>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta\s+property="og:title"[\s\S]*?\/\>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+property="og:description"[\s\S]*?\/\>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+property="og:url"[\s\S]*?\/\>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta\s+name="twitter:title"[\s\S]*?\/\>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+name="twitter:description"[\s\S]*?\/\>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace('    <!-- Yandex.Metrika counter -->', `${schema}
    <!-- Yandex.Metrika counter -->`)
}

function renderHomepageShell() {
  const schema = `    <script type="application/ld+json">${JSON.stringify(makeFaqSchema(faqItems))}</script>`
  return appShell.replace('    <!-- Yandex.Metrika counter -->', `${schema}
    <!-- Yandex.Metrika counter -->`)
}

function renderArticleShell(article) {
  const canonical = `${SITE_URL}/articles/${article.slug}/`
  const description = articleDescription(article)
  const title = `${article.title} - Бани Урала`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description,
    author: { '@type': 'Organization', name: 'Бани Урала' },
    publisher: { '@type': 'Organization', name: 'Бани Урала', url: SITE_URL },
    mainEntityOfPage: canonical,
    dateModified: BUILD_DATE,
    inLanguage: 'ru-RU',
  }
  const breadcrumbSchema = makeBreadcrumbSchema([
    { name: 'Главная', url: `${SITE_URL}/` },
    { name: 'База знаний', url: `${SITE_URL}/#knowledge` },
    { name: article.title, url: canonical },
  ])
  const schema = `    <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`

  return injectMeta(appShell, { title, description, canonical, type: 'article', schema })
}

function renderLandingShell(landing) {
  const canonical = `${SITE_URL}${landing.path}`
  const enhancement = getLandingEnhancement(landing.path)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: landing.title,
    description: landing.description,
    provider: { '@type': 'Organization', name: 'Бани Урала', url: SITE_URL },
    areaServed: ['Свердловская область', 'Курганская область', 'Тюменская область', 'Челябинская область'],
    serviceType: 'Строительство бань под ключ',
  }
  const breadcrumbSchema = makeBreadcrumbSchema([
    { name: 'Главная', url: `${SITE_URL}/` },
    { name: landing.title, url: canonical },
  ])
  const faqScript = enhancement.faq?.length
    ? `\n    <script type="application/ld+json">${JSON.stringify(makeFaqSchema(enhancement.faq))}</script>`
    : ''
  const schema = `    <script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>${faqScript}`

  return injectMeta(appShell, {
    title: landing.metaTitle || `${landing.title} - Бани Урала`,
    description: landing.description,
    canonical,
    schema,
  })
}

function renderSitemap() {
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    ...seoLandings.map((landing) => ({ loc: `${SITE_URL}${landing.path}`, priority: '0.9' })),
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

fs.writeFileSync(path.join(distDir, 'index.html'), renderHomepageShell(), 'utf8')

for (const article of allArticles) {
  const articleDir = path.join(distDir, 'articles', article.slug)
  fs.mkdirSync(articleDir, { recursive: true })
  fs.writeFileSync(path.join(articleDir, 'index.html'), renderArticleShell(article), 'utf8')
}

for (const landing of seoLandings) {
  const landingDir = path.join(distDir, landing.path)
  fs.mkdirSync(landingDir, { recursive: true })
  fs.writeFileSync(path.join(landingDir, 'index.html'), renderLandingShell(landing), 'utf8')
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), renderSitemap(), 'utf8')
fs.writeFileSync(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf8')

console.log(`Generated homepage schema, ${allArticles.length} article pages, ${seoLandings.length} landing pages and sitemap.xml`)
