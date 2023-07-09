export default function isEmailValid(email: string): boolean {
    // Define a regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test if the email matches the regular expression
    return emailRegex.test(email);
  }

  