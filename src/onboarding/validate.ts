export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isIndianMobile(digits: string) {
  return /^[6-9]\d{9}$/.test(digits);
}

export function dobError(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return "Use the format DD/MM/YYYY.";

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  const real =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  if (!real) return "That date does not exist.";

  const today = new Date();
  let age = today.getFullYear() - year;
  const beforeBirthday =
    today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day);
  if (beforeBirthday) age -= 1;
  if (age < 18) return "The person needs to be at least 18.";
  if (age > 80) return "Check the year and try again.";
  return null;
}
