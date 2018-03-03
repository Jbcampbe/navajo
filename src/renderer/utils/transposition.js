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
