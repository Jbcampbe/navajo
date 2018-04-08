import { alphabet, buildAlphabetMap } from './alphabet'

const alphabetMap = buildAlphabetMap(' ')

/**
 * generate all possible simple shift plaintexts
 *
 * @param {string} message - encrypted message. should be all lowercase with no spaces
 * @returns {array} - array of plaintext messages. represents all possible ceaser shifts
 */
function runShifts (message) {
  const shifts = []
  let decryptedMessage
  for (let i = 1; i < 26; i++) {
    decryptedMessage = decipherCeaser(message, i)
    shifts.push(decryptedMessage)
  }

  return shifts
}

/**
 * decrypt simple shift (ceaser) ciphers
 *
 * @param {string} message - encrypted message. should be all lowercase with no spaces
 * @param {number} shiftAmt - how many letters to shift the alphabet by
 * @returns {string} - plaintext message
 */
function decipherCeaser (message, shiftAmt) {
  let decryptedMessage = ''
  let shiftIdx

  for (let i = 0; i < message.length; i++) {
    shiftIdx = alphabet.indexOf(message[i]) - shiftAmt
    if (shiftIdx < 0) {
      shiftIdx = shiftIdx + 26
    }
    decryptedMessage = decryptedMessage.concat(alphabet[shiftIdx])
  }

  return decryptedMessage
}

/**
 * decrypt keyword ciphers
 *
 * @param {string} message - encrypted message. should be all lowercase with no spaces
 * @param {object} keyMap - maps ciphertext keys to plaintext values
 * @returns {string} - plaintext message
 */
function decipherKeyword (message, keyMap) {
  let decryptedMessage = ''
  for (let i = 0; i < message.length; i++) {
    if (keyMap[message[i]] !== '') {
      decryptedMessage = decryptedMessage.concat(keyMap[message[i]])
    } else {
      decryptedMessage = decryptedMessage.concat(message[i])
    }
  }

  return decryptedMessage
}

/**
 * adds a mapping between a ciphertext letter and its plaintext equivalent. protects
 * against having two keys map to the same value
 *
 * @param {array} alphabetMap - the alphabet map object you wish to modify
 * @param {string} ciphertextLetter - the key in the alphabet map
 * @param {string} plaintextLetter - the new value to add to the alphabet map
 */
function addLetterMapping (alphabetMap, ciphertextLetter, plaintextLetter) {
  if (Object.values(alphabetMap).includes(plaintextLetter)) {
    return false
  }

  alphabetMap[ciphertextLetter] = plaintextLetter
  return true
}

/**
 *
 * @param {array} alphabetMap - the alphabet map object you wish to modify
 * @param {letter} ciphertextLetter - the key in the alphabet map you wish to clear
 */
function clearLetterMapping (alphabetMap, ciphertextLetter) {
  alphabetMap[ciphertextLetter] = ' '
  return true
}

export { runShifts, decipherCeaser, decipherKeyword, addLetterMapping, clearLetterMapping, alphabetMap }
