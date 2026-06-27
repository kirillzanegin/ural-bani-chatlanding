export const METRIKA_COUNTER_ID = 110205159

export function reachGoal(goalName) {
  if (typeof window === 'undefined') return
  if (typeof window.ym !== 'function') return

  window.ym(METRIKA_COUNTER_ID, 'reachGoal', goalName)
}

export function trackPageView(url = window.location.href) {
  if (typeof window === 'undefined') return
  if (typeof window.ym !== 'function') return

  window.ym(METRIKA_COUNTER_ID, 'hit', url)
}
