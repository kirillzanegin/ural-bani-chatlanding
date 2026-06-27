import { reachGoal } from './metrika.js'

const LEAD_WEBHOOK_URL = 'https://zeehost.ru/webhook/bani_urala'

function getUtmParams() {
  const params = new URLSearchParams(window.location.search)

  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
  }
}

function normalizeList(value, customValue = '') {
  const items = Array.isArray(value) ? value : value ? [value] : []
  const custom = customValue ? [customValue] : []
  return [...items, ...custom].filter(Boolean).join(', ')
}

function trackLeadGoals(formSource) {
  reachGoal('lead_submit')

  if (formSource === 'Чат-опрос') {
    reachGoal('quiz_submit')
  }

  if (formSource === 'Нижняя форма') {
    reachGoal('feedback_submit')
  }
}

export async function sendLeadToWebhook(payload) {
  const now = new Date()
  const contact = payload.contact || {}
  const lead = {
    date: now.toLocaleDateString('ru-RU'),
    time: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    createdAt: now.toISOString(),
    formSource: payload.formSource || '',
    name: payload.name || contact.name || '',
    phone: payload.phone || contact.phone || '',
    comment: payload.comment || contact.comment || '',
    area: normalizeList(payload.area, payload.areaCustom),
    rooms: normalizeList(payload.rooms, payload.roomsCustom),
    term: normalizeList(payload.term),
    page: window.location.href,
    referrer: document.referrer || '',
    ...getUtmParams(),
    raw: payload,
  }

  await fetch(LEAD_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
    body: JSON.stringify(lead),
  })

  trackLeadGoals(lead.formSource)

  return lead
}
