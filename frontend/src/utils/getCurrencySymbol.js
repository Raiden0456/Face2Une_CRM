export function getCurrencySymbol(currencyCode) {
  switch (currencyCode.toLowerCase()) {
    case 'eur':
      return '€';
    case 'gbp':
      return '£';
    default:
      return '';
  }
}
