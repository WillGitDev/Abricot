export function dateFormatDM(date) {
  if (!date) {
    return 'Pas de date/Format invalide';
  }
  date = new Date(date);
  if (isNaN(date.getTime())) {
    return 'Date invalide';
  }
  const formatted = date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  });
  return formatted;
}
