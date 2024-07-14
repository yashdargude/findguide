function isValidIndianPhoneNumber(phoneNumber: string): boolean {
  const regex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return regex.test(phoneNumber);
}

function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export { isValidIndianPhoneNumber, isValidEmail };
