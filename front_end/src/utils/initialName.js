export function initialName(fullName) {
    if (!fullName) return '';
    const words = fullName.split(' ');
    const firstLetter = words[0].charAt(0);
    const secondLetter = words[1]?.charAt(0);
    return (firstLetter + secondLetter).toUpperCase();
}
