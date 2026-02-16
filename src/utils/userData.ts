export const censorEmail = (
  email: string,
  censorAmount: number = 5,
): string => {
  if (email.length <= 2) {
    return email;
  }

  const addrFirstChar = email[0];
  const addrLastChar = email[email.indexOf("@") - 1];
  const mailDomain = email.substring(email.indexOf("@"), email.length);
  const censoredMiddle = "*".repeat(censorAmount);

  return addrFirstChar + censoredMiddle + addrLastChar + mailDomain;
};

export const truncateString = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const firstCharUpperCase = (text: string): string => {
  if (text.length < 2) return text.toUpperCase();

  const firstChar = text[0].toUpperCase();
  const remainingText = text.substring(1, text.length)

  return firstChar + remainingText;
}