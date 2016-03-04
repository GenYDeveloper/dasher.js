(function() {
  'use strict';

  angular 
    .module('dasherApp')
    .controller('PasswordController', PasswordController);

  function PasswordController($scope) {
    var vm = this,
      LETTER_CHARCODE = 65,
      NUMBER_CHARCODE = 48,
      SYMBOL_CHARCODE = 33;

    vm.passwords = [];

    vm.createPasswords = function() {
      // get html input values
      var amount = $scope.password.amount;
      var letterAmount = $scope.password.letters; 
      var numberAmount = $scope.password.numbers;
      var symbolAmount = $scope.password.symbols;
      _.times(amount, function(i) {
        // concat character chunks
        var password = getRandomLetters(letterAmount) +
          getRandomNumbers(numberAmount) + getRandomSymbols(symbolAmount);
        password = _.shuffle(password); // shuffle the password
        password = _.join(password, ''); // transform array to a string
        password = _.replace(password, ',', ''); // remove commas from password
        vm.passwords[i] = password; // add password to passwords array
      });
      letterAmount = null;
      numberAmount = null;
      symbolAmount = null;
      console.log(vm.passwords);
      return vm.passwords;
    };

    function getRandomLetters(amount) {
      var flip = null; // bit deciding if letter is uppercase or lowercase
      var letters = []; // array of random letters

      _.times(amount, function(i) {
        var letter = _.random(25) + LETTER_CHARCODE; // random ASCII decimal for uppercase letters
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
      letters = _.join(letters, ''); // transform array to a string
      flip = null;
      return letters;
    }

    function getRandomNumbers(amount) {
      var numbers = []; // array of random numbers

      _.times(amount, function(i) {
        var number = _.random(9) + NUMBER_CHARCODE; // random ASCII decimal for numbers
        number = String.fromCharCode(number); //conversion from ASCII decimal to number value
        numbers[i] = number; // add new random number to numbers array
        number = null;
      });
      numbers = _.join(numbers, ''); // transform array to a string
      return numbers;
    }

    function getRandomSymbols(amount) {
      var symbols = []; // array of random symbols

      _.times(amount, function(i) {
        var symbol = _.random(13) + SYMBOL_CHARCODE; // random ASCII decimal for subset of symbols
        symbol = String.fromCharCode(symbol); // conversion from ASCII decimal to symbol value
        symbols[i] = symbol; // add new symbol to the symbols array
        symbol = null;
      });
      symbols = _.join(symbols, ''); // transform array to a string
      return symbols;
    }
  }
})();

//_.random(1);
//65-90
//48-57
// 33-47
//_.toLower(string);