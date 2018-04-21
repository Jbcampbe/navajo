import { alphabet } from './alphabet'
import { getSingleFrequencies, englishFrequencies } from './frequency'
import { runShifts } from './monoalphabetic'

/**
 * decrypts vigenere ciphers
 *
 * @param {string} message - encrypted message. should be all lowercase with no spaces
 * @param {string} keyword - keyword for the decrypting
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

/**
 * performs kasiski analysis
 *
 * @param {string} message - encrypted message to analyze. should be all lowercase with no spaces
 * @returns {array} - factors for potential key sizes
 */
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

  let likelyFactors = Object.keys(factorCounts).sort((a, b) => factorCounts[b] - factorCounts[a]).slice(0, 5)

  return likelyFactors
}

/**
 * performs IC (Index of Coincidence) analysis
 *
 * @param {string} message - encrypted message to analyze. should be all lowercase with no spaces
 * @param {number} numAlphabets - number of alphabets to use for ic analysis
 * @returns {array} - factors for potential key sizes
 */
function ic (message, numAlphabets) {
  let subtexts = splitMessage(message, numAlphabets)

  let ics = new Array(numAlphabets).fill(0)
  for (let i = 0; i < numAlphabets; i++) {
    let counts = {}
    let n = subtexts[i].length
    for (let j = 0; j < n; j++) {
      counts[subtexts[i][j]] = counts[subtexts[i][j]] ? counts[subtexts[i][j]] + 1 : 1
    }
    let vals = Object.values(counts)
    if (vals.length !== 0) {
      ics[i] = vals.reduce((sum, value) => sum + (value * (value - 1))) / (n * (n - 1))
      ics[i] = Number.parseFloat(ics[i]).toFixed(3)
    }
  }
  return ics
}

/**
 * performs Low Frequency analysis
 *
 * @param {string} message - encrypted message to analyze. should be all lowercase with no spaces
 * @param {number} numAlphabets - number of alphabets to use for low frequency analysis
 * @returns {array} - potential vigenere key
 */
function lowFrequencyAnalysis (message, numAlphabets) {
  let subtexts = splitMessage(message, numAlphabets)
  let potentialKey = ''
  for (let i = 0; i < subtexts.length; i++) {
    let shifts = runShifts(subtexts[i])
    let minIdx = 0
    let minMse = 100
    shifts.forEach((shift, index) => {
      let frequencies = getSingleFrequencies(shift)
      let mse = meanSquaredError(frequencies, englishFrequencies)
      if (mse < minMse) {
        minMse = mse
        minIdx = index
      }
    })
    potentialKey = potentialKey.concat(alphabet[minIdx])
  }
  return potentialKey
}

function meanSquaredError (frequencyMap) {
  let freqs = Object.values(frequencyMap)
  let expectedFreqs = Object.values(englishFrequencies)
  let mse = 0
  for (let i = 0; i < 26; i++) {
    if (freqs[i] > 0) {
      mse += (expectedFreqs[i] - freqs[i]) ** 2
    }
  }
  return mse
}

function splitMessage (message, numAlphabets) {
  let subtexts = new Array(numAlphabets).fill('')
  for (let i = 0; i < message.length; i++) {
    subtexts[i % numAlphabets] = subtexts[i % numAlphabets].concat(message[i])
  }
  return subtexts
}

function findPrimeFactors (num) {
  if (isPrime(num)) {
    return [num]
  }

  let prime = 2
  let factors = []

  while (num !== 1) {
    if (num % prime === 0) {
      num = num / prime
      factors.push(prime)
    } else {
      prime = findNextPrime(prime)
    }
  }

  return factors
}

function findNextPrime (prime) {
  for (let i = prime + 1; true; i++) {
    if (isPrime(i)) {
      return i
    }
  }
}

function isPrime (num) {
  let primestate = true
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      primestate = false
    }
  }
  return primestate
}

export { decipherVigenere, kasiski, ic, lowFrequencyAnalysis }
