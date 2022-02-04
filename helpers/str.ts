export function addLetter(str: string, letter: string): string {
  return `${str}${letter}`
    .split("")
    .filter((v, i, a) => a.indexOf(v) === i)
    .join("");
}

export function removeLetter(str: string, letter: string) {
  return str
    .split("")
    .filter((l) => l !== letter)
    .join("");
}

export function addLetterToPosition(
  str: string,
  position: number,
  letter: string
) {
  const arr = str.split("");
  arr[position] = letter;
  return arr.join("");
}

export function removeLetterFromPosition(str: string, position: number) {
  return addLetterToPosition(str, position, "_");
}

export function stringOrPostionalTemplate(str?: string) {
  return str ? str : "_____";
}
