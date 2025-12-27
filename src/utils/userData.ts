export const censorEmail = (
  email: string,
  censorAmount: number = 5
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
