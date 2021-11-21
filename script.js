// Assignment code here

// Create characters for password
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var chars = "!@#$%^&*()?<>.,':;-+=_";
var regen = false;

// Default password requirements for global reach
var passwordRequirements = {
  len: null,
  lowercase: null,
  uppercase: null,
  numeric: null,
  specialchar: null
}

// Random!
var randomNum = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Password Requirements
var passRequire = function() {
  // Ask user for password specifications
  // Ask Length
  var passLength = window.prompt("How many characters long do you want your password to be? (8-128, or * for random length)");
  // If *, return random length
  if (passLength == "*") {
    passLength = randomNum(8,128);
  } else {
    passLength = parseInt(passLength);
  }
  // If passLength is empty / not a number, less than 8, or more than 128, rerun function
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
  passwordRequirements = {
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

  // If generated password has new requirements
  if (!regen){
    var passReq = JSON.parse(passRequire()); // If new, run passRequire
  }
  // Or regenerate password from already-entered requirements
  else {
    var passReq = passwordRequirements;
  }
  
  // Create bank of possible characters for password
  var myPassword = "";
  var possChar = "";
  var oneOfEach = []; // oneOfEach ensures at least one character from each selected type will make it into the password

  // If lowercase letters are required
  if (passReq.lowercase) {
    possChar += alphabet;
    // Randomly generate 1 lowercase letter that will be in the password
    var alphaLow = alphabet.split("");
    oneOfEach.push(alphaLow[randomNum(0,alphaLow.length)]);
  }
  // If uppercase letters are required
  if (passReq.uppercase) {
    possChar += alphabet.toUpperCase();
    // Randomly generate 1 uppercase letter that will be in the password
    var alphaUpp = alphabet.toUpperCase().split("");
    oneOfEach.push(alphaUpp[randomNum(0,alphaUpp.length)]);
  }
  // If numbers are required
  if (passReq.numeric) {
    possChar += numbers;
    // Randomly generate 1 number that will be in the password
    var charNum = numbers.split("");
    oneOfEach.push(charNum[randomNum(0,charNum.length)]);
  }
  // If special characters are required
  if (passReq.specialchar) {
    possChar += chars;
    // Randomly generate 1 special character that will be in the password
    var charSpec = chars.split("");
    oneOfEach.push(charSpec[randomNum(0,charSpec.length)]);
  }
  // Bank of letters for the remaining letters of the password - Repeats very possible
  var letterBank = possChar.split("");

  // Generate random password
  for (i = 0; i < passReq.len; i++) {
    
    if ((passReq.len - myPassword.length) <= oneOfEach.length) {
      // Make sure all characters in one of each ARE in the password
      var headTail = 0.4;
    } else {
      // Randomly pick if password pulls from letter bank or one of each array
      var headTail = Math.random();
    }

    if (headTail < 0.5 && oneOfEach.length > 0) {
      // If one of each, pull a random character from the array
      var selectedChar = randomNum(0,oneOfEach.length);
      myPassword += oneOfEach[selectedChar];
      // Remove from array when used
      oneOfEach.splice(selectedChar, 1);
    } else {
      // If else, pull random character from letter bank
      myPassword += letterBank[randomNum(0,letterBank.length)];
    }
  }

  return myPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
var regenBtn = document.querySelector("#regen");

// Regenerate button is disabled by default
regenBtn.disabled = true;

function generate() {
  regen = false;
  writePassword();
  // Regenerate button becomes active once requirements are initially set
  regenBtn.disabled = false;
}
function regenerate() {
  regen = true;
  writePassword();
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", generate);
regenBtn.addEventListener("click", regenerate);