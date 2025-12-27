export const censorEmail = (email: string): string => {
  if (email.length <= 2) {
    return email;
  }

  const addrFirstChar = email[0];
  const addrLastChar = email[email.indexOf("@") - 1];
  const mailDomain = email.substring(email.indexOf("@"), email.length);
  const censoredMiddle = "*".repeat(5);

  return addrFirstChar + censoredMiddle + addrLastChar + mailDomain;
};
