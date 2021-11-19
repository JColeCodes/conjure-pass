// Assignment code here
// Random!
var randomNum = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Generate Password
var generatePassword = function() {
  // Create characters for password
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var numbers = "0123456789";
  var chars = "!@#$%^&*()?<>.,':;-+=_";

  // Assign requirements for the password
  var passwordRequirements = {
    length: 8,
    lowercase: true,
    uppercase: true,
    numeric: true,
    specialchar: true
  }

  // Create bank of possible characters for password
  var possChar = "";
  if (passwordRequirements.lowercase) {
    possChar += alphabet;
  }
  if (passwordRequirements.uppercase) {
    possChar += alphabet.toUpperCase();
  }
  if (passwordRequirements.numeric) {
    possChar += numbers;
  }
  if (passwordRequirements.specialchar) {
    possChar += chars;
  }
  var letterBank = possChar.split("");
  console.log(letterBank);

  // Generate random password
  var myPassword = "";
  for (i = 0; i < passwordRequirements.length; i++) {
    myPassword += letterBank[randomNum(0,letterBank.length)];
    console.log(myPassword);
  }

  return myPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
