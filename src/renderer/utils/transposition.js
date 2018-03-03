/**
 * decrypts anagram ciphers
 *
 * @param  {string} message - encrypted message. should be all lowercase with no spaces
 * @param  {array} columnShifts - represents how the letters in each block are to be permuted. length of this array determines the block size
 * @returns {string} - plaintext message
 */
function decipherAnagram (message, columnShifts) {
  let blockSize = columnShifts.length
  let newBlock
  let decryptedMessage = []

  for (let i = 0; i < message.length; i += blockSize) {
    newBlock = []

    for (let j = 0; j < blockSize; j++) {
      newBlock[i + columnShifts[j]] = message[i + j]
    }

    decryptedMessage = decryptedMessage.concat(newBlock)
  }

  return decryptedMessage.join('')
}

export { decipherAnagram }
