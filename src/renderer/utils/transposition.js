/**
 * decrypts anagram ciphers
 *
 * @param  {string} message - encrypted message. should be all lowercase with no spaces
 * @param  {array} perms - represents how the letters in each block are to be permuted. length of this array determines the block size
 * @returns {string} - plaintext message
 */
function decipherAnagram (message, perms) {
  let blockSize = perms.length
  let newBlock
  let decryptedMessage = []

  for (let i = 0; i < message.length; i += blockSize) {
    newBlock = []

    for (let j = 0; j < blockSize; j++) {
      newBlock[i + perms[j] - 1] = message[i + j]
    }

    decryptedMessage = decryptedMessage.concat(newBlock)
  }

  return decryptedMessage.join('')
}

/**
 * decrypts columnar transposition ciphers
 *
 * @param {string} message - encrypted message. should be all lowercase with no spaces
 * @param {array} perms - represents how the columns in the cipher are to be permuted. the length of the array determines how many columns
 */
function decipherColumnarTransposition (message, perms) {
  let decryptedMessage = ''
  let numCols = perms.length
  let numRows = message.length / numCols

  for (let i = 0; i < numRows; i++) {
    for (let j = i; j < message.length; j += numRows) {
      decryptedMessage = decryptedMessage.concat(message[j])
    }
  }

  if (isPermutedColumns(perms)) {
    // if the columns were permuted then we need to add the additional
    // step of shuffling the columns (exactly the same as solving an anagram cipher)
    decryptedMessage = decipherAnagram(decryptedMessage, perms)
  }

  return decryptedMessage
}

/**
 * checks if the columns in the columnar transposition were permuted
 *
 * @param {array} perms - column permutations
 */
function isPermutedColumns (perms) {
  for (let i = 0; i < perms.length; i++) {
    if (perms[i] !== (i + 1)) {
      return true
    }
  }

  return false
}

export { decipherAnagram, decipherColumnarTransposition, isPermutedColumns }
