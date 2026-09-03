export function isValidPhone(value) {
  const digits = String(value || '').replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

export function validateLeadContact(contact) {
  return {
    name: contact.name.trim().length < 2 ? 'Введите имя' : '',
    phone: isValidPhone(contact.phone) ? '' : 'Введите номер телефона полностью',
    consent: contact.consent ? '' : 'Подтвердите согласие на обработку данных',
  }
}
