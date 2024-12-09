const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(val = true) {
    this.val = val;
  }

  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  charWithNum = {};

  fillObj() {
    for (let i = 0; i < this.alphabet.length; i++) {
      let key = this.alphabet[i];
      this.charWithNum[key] = i;
    }
    return this.charWithNum;
  }

  encrypt(text, keyWord) {
    if (typeof text === 'undefined' || typeof keyWord === 'undefined') {
      throw new Error("Incorrect arguments!");
    }

    this.fillObj();
    text = text.toUpperCase();
    keyWord = keyWord.toUpperCase();
    let code = "";
    let numText = 0;
    let numKey = 0;
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      numText = this.charWithNum[text[i]];

      if (typeof numText !== "number") {
        count++;
        code += text[i];
      } else {
        numKey = this.charWithNum[keyWord[(i - count) % keyWord.length]];
        code += this.alphabet[(numText + numKey) % this.alphabet.length];
      }
    }

    if (this.val === false) {
      code = code.split("").reverse().join("");
    }

    return code;
  }

  decrypt(text, keyWord) {
    if (typeof text === 'undefined' || typeof keyWord === 'undefined') {
      throw new Error("Incorrect arguments!");
    }

    this.fillObj();
    text = text.toUpperCase();
    keyWord = keyWord.toUpperCase();
    let code = "";
    let numText = 0;
    let numKey = 0;
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      numText = this.charWithNum[text[i]];

      if (typeof numText !== "number") {
        count++;
        code += text[i];
      } else {
        numKey = this.charWithNum[keyWord[(i - count) % keyWord.length]];
        code += this.alphabet[(numText - numKey + this.alphabet.length) % this.alphabet.length];
      }
    }

    if (this.val === false) {
      code = code.split("").reverse().join("");
    }

    return code;

  }
}

module.exports = {
  VigenereCipheringMachine
};
