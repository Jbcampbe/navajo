import { alphabet } from './alphabet'

function runShifts (message) {
  const shifts = []
  let decryptedMessage
  for (let i = 1; i < 26; i++) {
    decryptedMessage = decipherCeaser(message, i)
    shifts.push(decryptedMessage)
  }

  return shifts
}

function decipherCeaser (message, shiftAmt) {
  let decryptedMessage = ''
  let shiftIdx

  for (let i = 0; i < message.length; i++) {
    shiftIdx = (alphabet.indexOf(message[i]) + shiftAmt) % 26
    decryptedMessage = decryptedMessage.concat(alphabet[shiftIdx])
  }

  return decryptedMessage
}

function decipherKeyword (message, keyMap) {
  let decryptedMessage = ''
  for (let i = 0; i < message.length; i++) {
    decryptedMessage = decryptedMessage.concat(keyMap[message[i]])
  }

  return decryptedMessage
}

export { runShifts, decipherCeaser, decipherKeyword }
