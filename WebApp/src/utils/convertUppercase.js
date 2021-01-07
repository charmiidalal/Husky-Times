// CONVERT FIRST LETTERS TO UPPERCASE
const convertUppercase = string =>
  string
    .split(' ')
    .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
    .join(' ');

export default convertUppercase;
