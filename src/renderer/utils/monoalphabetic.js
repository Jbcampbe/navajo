import { alphabet } from './alphabet'

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
    decryptedMessage = decryptedMessage.concat(keyMap[message[i]])
  }

  return decryptedMessage
}

export { runShifts, decipherCeaser, decipherKeyword }
