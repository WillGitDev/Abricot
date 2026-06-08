export function initialName(fullName) {
  const words = fullName.split(' ');
  const firstLetter = words[0].charAt(0);
  const secondLetter = words[1].charAt(0);
  return (firstLetter + secondLetter).toUpperCase();
}
