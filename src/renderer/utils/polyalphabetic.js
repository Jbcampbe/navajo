import { alphabet } from './alphabet'

/**
 * decrypts vigenere ciphers
 *
 * @param  {string} message - encrypted message. should be all lowercase with no spaces
 * @param  {string} keyword - keyword for the decrypting
 * @returns {string} - plaintext message
 */
function decipherVigenere (message, keyword) {
  let decryptedMessage = ''

  for (let i = 0; i < message.length; i++) {
    let idx1 = alphabet.indexOf(message[i])
    let idx2 = alphabet.indexOf(keyword[i % keyword.length])

    let finalIndex = idx1 - idx2

    if (finalIndex < 0) {
      finalIndex = finalIndex + 26
    }

    decryptedMessage = decryptedMessage.concat(alphabet[finalIndex])
  }

  return decryptedMessage
}

function kasiski (message) {
  let previousPatternIdxs = {}
  let distances = []

  // only testing for patterns of length 10 or less
  for (let patternSize = 3; patternSize < 10; patternSize++) {
    for (let i = 0; i < message.length - patternSize; i += 1) {
      let pattern = message.substring(i, i + patternSize)
      if (previousPatternIdxs[pattern]) {
        distances.push(i - previousPatternIdxs[pattern])
      }
      previousPatternIdxs[pattern] = i
    }
  }

  let factorCounts = {}
  distances.forEach(distance => {
    let primeFactors = findPrimeFactors(distance)
    primeFactors.forEach(factor => {
      factorCounts[factor] = factorCounts[factor] ? factorCounts[factor] + 1 : 1
    })
  })

  return factorCounts
}

function findPrimeFactors (num) {
  let factors = []
  let factornums = []
  let arrada = []

  for (coun = 2; coun <= num/2; coun++) {
    if (num % coun == 0) {
      factornums.push(coun)
    }
  }

  for (i = 0; i < factornums.length; i++) {
    if (primecheck(factornums[i])) {
      factors.push(factornums[i])
    }
  }

  for (i = 0; i < factors.length; i++) {
    rightnow = factors[i]
    while (num % rightnow == 0) {
      arrada.push(factors[i])
      rightnow = rightnow * factors[i]
    }
  }

  return arrada
}

function primecheck (num){
  let primestate = true;
  for (coun = 2; coun <= Math.sqrt(num); coun++) {
    if (num % coun == 0) {
      primestate = false
    }
  }
  return primestate
}

export { decipherVigenere }
