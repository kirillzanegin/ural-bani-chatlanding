import { reachGoal } from './metrika.js'
import { reachMailruGoal } from './mailru.js'

const LEAD_WEBHOOK_URL = 'https://zeehost.ru/webhook/bani_urala'
const UTM_STORAGE_KEY = 'bani_urala_utm'
const REQUEST_TIMEOUT_MS = 12000

function getUtmParams() {
  const params = new URLSearchParams(window.location.search)
  const current = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
  }

  try {
    if (Object.values(current).some(Boolean)) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(current))
      return current
    }

    const saved = JSON.parse(window.sessionStorage.getItem(UTM_STORAGE_KEY) || 'null')
    return saved && typeof saved === 'object' ? { ...current, ...saved } : current
  } catch {
    return current
  }
}

function normalizeList(value, customValue = '') {
  const items = Array.isArray(value) ? value : value ? [value] : []
  const custom = customValue ? [customValue] : []
  return [...items, ...custom].filter(Boolean).join(', ')
}

function trackLeadGoals(formSource) {
  reachGoal('lead_submit')
  reachMailruGoal('lead_submit')

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
    name: (payload.name || contact.name || '').trim(),
    phone: (payload.phone || contact.phone || '').trim(),
    comment: (payload.comment || contact.comment || '').trim(),
    area: normalizeList(payload.area, payload.areaCustom),
    rooms: normalizeList(payload.rooms, payload.roomsCustom),
    term: normalizeList(payload.term),
    page: window.location.href,
    referrer: document.referrer || '',
    ...getUtmParams(),
    raw: payload,
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    await fetch(LEAD_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify(lead),
      signal: controller.signal,
    })
  } finally {
    window.clearTimeout(timeout)
  }

  trackLeadGoals(lead.formSource)

  return lead
}
