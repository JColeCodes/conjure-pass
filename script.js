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

  // Ask user for password specifications
  // Ask Length
  var passLength = window.prompt("How many characters long do you want your password to be? (8-128, or * for random length)");
  if (passLength == "*") {
    passLength = randomNum(8,128);
  } else {
    passLength = parseInt(passLength);
  }
  if (!passLength || passLength < 8 || passLength > 128){
    window.alert("Not a valid number length.");
    return generatePassword();
  }

  // Ask if lowercase
  var passLower = window.confirm("Would you like your password to have lowercase characters? (a, b, c...)");
  console.log(passLower);
  // Ask if UPPERCASE
  var passUpper = window.confirm("Would you like your password to have UPPERCASE characters? (A, B, C...)");
  console.log(passUpper);
  // Ask if number
  var passNum = window.confirm("Would you like your password to have numberical (number) characters? (1, 2, 3...)");
  console.log(passNum);
  // Ask if special characters
  var passSpec = window.confirm("Would you like your password to have special characters? (!, $, &...)");
  console.log(passSpec);

  // Assign requirements for the password
  var passwordRequirements = {
    length: passLength,
    lowercase: passLower,
    uppercase: passUpper,
    numeric: passNum,
    specialchar: passSpec
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
