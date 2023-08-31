export default function isPasswordOk(password: string): string | true {
  // Define regular expressions to check for different criteria
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  // Initialize an array to hold missing criteria
  const missingCriteria = [];

  // Check if the password meets the minimum length requirement
  if (password.length < 8) {
    missingCriteria.push("At least 8 characters");
  }

  // Check if the password contains at least one uppercase letter, one lowercase letter, one digit, and one special character
  if (!uppercaseRegex.test(password)) {
    missingCriteria.push("At least one uppercase letter");
  }
  if (!lowercaseRegex.test(password)) {
    missingCriteria.push("At least one lowercase letter");
  }
  if (!digitRegex.test(password)) {
    missingCriteria.push("At least one digit");
  }
  if (!specialCharRegex.test(password)) {
    missingCriteria.push("At least one special character");
  }

  // If the password meets all criteria, return true
  if (missingCriteria.length === 0) {
    return true;
  }

  // Otherwise, return a string with the missing criteria
  return `Password is missing ${missingCriteria.join(", ")}.`;
}

