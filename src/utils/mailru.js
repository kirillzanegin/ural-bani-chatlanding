export const MAILRU_COUNTER_ID = 3791729

export function reachMailruGoal(goalName) {
  if (typeof window === 'undefined') return

  const queue = window._tmr || (window._tmr = [])
  queue.push({ id: MAILRU_COUNTER_ID, type: 'reachGoal', goal: goalName })
}
