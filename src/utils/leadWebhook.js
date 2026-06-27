const LEAD_WEBHOOK_URL = 'https://zeehost.ru/webhook-test/bani_urala'

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

function normalizeList(value) {
  if (Array.isArray(value)) return value.join(', ')
  return value || ''
}

export async function sendLeadToWebhook(payload) {
  const now = new Date()
  const lead = {
    date: now.toLocaleDateString('ru-RU'),
    time: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    createdAt: now.toISOString(),
    formSource: payload.formSource || '',
    name: payload.name || '',
    phone: payload.phone || '',
    comment: payload.comment || '',
    area: normalizeList(payload.area),
    rooms: normalizeList(payload.rooms),
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

  return lead
}
