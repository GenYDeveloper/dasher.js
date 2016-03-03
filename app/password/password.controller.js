(function() {
  'use strict';

  angular 
    .module('dasherApp')
    .controller('PasswordController', PasswordController);

  function PasswordController() {
    var vm = this;
    vm.passwords = [];
    // vm.passwordAmount = $scope.password.amount;
    // vm.letterAmount = $scope.password.letters;
    // vm.numberAmount = $scope.password.numbers;
    // vm.symbolAmount = $scope.password.symbols;

    vm.getRandomLetters = function(amount) {
      var flip = null; // bit deciding if letter is uppercase or lowercase
      var letters = []; // array of random letters

      _.times(amount, function(i) {
        var letter = _.random(25) + 65; // random ASCII decimal for uppercase letters
        letter = String.fromCharCode(letter); // conversion from ASCII decimal to letter value
        flip = _.random(1); // flip bit
        if(flip === 0) {
          // if bit is 0, convert letter to lowercase
          letter = _.toLower(letter);
        } else { 
          // keep it as uppercase
        }
        letters[i] = letter; // add new random letter to letters array
        letter = null;
      });
      // console.log(letters);
      flip = null;
      return letters;
    };

    vm.getRandomNumbers = function(amount) {
      var numbers = []; // array of random numbers

      _.times(amount, function(i) {
        var number = _.random(9) + 48; // random ASCII decimal for numbers
        number = String.fromCharCode(number); //conversion from ASCII decimal to number value
        numbers[i] = number; // add new random number to numbers array
        number = null;
      });
      // console.log(numbers);
      return numbers;
    };

    vm.getRandomSymbols = function(amount) {
      var symbols = []; // array of random symbols

      _.times(amount, function(i) {
        var symbol = _.random(13) + 33; // random ASCII decimal for subset of symbols
        symbol = String.fromCharCode(symbol); // conversion from ASCII decimal to symbol value
        symbols[i] = symbol; // add new symbol to the symbols array
        symbol = null;
      });
      // console.log(symbols);
      return symbols;
    };

    vm.createPasswords = function() {
      var amount = vm.passwordAmount;
      var letterAmount = vm.letterAmount;
      var numberAmount = vm.numberAmount;
      var symbolAmount = vm.symbolAmount;
      _.times(amount, function(i) {
        var password = vm.getRandomLetters(letterAmount) +
          vm.getRandomNumbers(numberAmount) + vm.getRandomSymbols(symbolAmount);
        vm.passwords[i] = password;
      });
      console.log(vm.passwords);
      return vm.passwords;
    };

    // vm.getRandomLetters(100);
    // vm.getRandomSymbols(100);
    // vm.getRandomNumbers(100);
    // vm.createPasswords(vm.passwordAmount);
  }
})();

//_.random(1);
//65-90
//48-57
// 33-47
//_.toLower(string);