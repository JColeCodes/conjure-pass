// Assignment code here

// Create characters for password
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var chars = "!@#$%^&*()?<>.,':;-+=_";

// Random!
var randomNum = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Password Requirements
var passRequire = function() {
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
    return passRequire();
  }

  // Ask if lowercase
  var passLower = window.confirm("Would you like your password to have lowercase characters? (a, b, c...)");
  // Ask if UPPERCASE
  var passUpper = window.confirm("Would you like your password to have UPPERCASE characters? (A, B, C...)");
  // Ask if number
  var passNum = window.confirm("Would you like your password to have numberical (number) characters? (1, 2, 3...)");
  // Ask if special characters
  var passSpec = window.confirm("Would you like your password to have special characters? (!, $, &...)");

  if (!passLower && !passUpper && !passNum && !passSpec) {
    window.alert("You must have at least one password requirement selected.");
    return passRequire();
  }

  // Assign requirements for the password
  var passwordRequirements = {
    len: passLength,
    lowercase: passLower,
    uppercase: passUpper,
    numeric: passNum,
    specialchar: passSpec
  }

  return JSON.stringify(passwordRequirements);
}

// Generate Password
var generatePassword = function() {

  var passReq = JSON.parse(passRequire());

  // Create bank of possible characters for password
  var possChar = "";
  if (passReq.lowercase) {
    possChar += alphabet;
  }
  if (passReq.uppercase) {
    possChar += alphabet.toUpperCase();
  }
  if (passReq.numeric) {
    possChar += numbers;
  }
  if (passReq.specialchar) {
    possChar += chars;
  }
  var letterBank = possChar.split("");

  // Generate random password
  var myPassword = "";
  for (i = 0; i < passReq.len; i++) {
    myPassword += letterBank[randomNum(0,letterBank.length)];
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
