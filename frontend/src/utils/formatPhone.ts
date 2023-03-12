export function formatPhoneNumber(phoneNumber: string) {
  // Remove all non-digit characters
  let cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // Format the phone number with a mask
  let formatted = cleaned.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');

  return formatted;
}
