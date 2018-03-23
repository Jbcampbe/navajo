import { buildAlphabetMap } from '@/utils/alphabet'

function getSingleFrequencies (message) {
  let counts = buildAlphabetMap(0)
  message.split('').forEach(letter => {
    counts[letter] = counts[letter] ? counts[letter] + 1 : 1
  })

  return counts
}

function getDigramFrequencies (message) {
  let counts = {}
  for (let i = 0; i < message.length - 1; i++) {
    let digram = message.substring(i, i + 2)
    counts[digram] = counts[digram] ? counts[digram] + 1 : 1
  }

  return counts
}

function getTrigramFrequencies (message) {
  let counts = {}
  for (let i = 0; i < message.length - 2; i++) {
    let digram = message.substring(i, i + 3)
    counts[digram] = counts[digram] ? counts[digram] + 1 : 1
  }

  return counts
}

export { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies }
