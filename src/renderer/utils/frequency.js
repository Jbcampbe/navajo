import { buildAlphabetMap } from '@/utils/alphabet'

function getSingleFrequencies (message) {
  let counts = buildAlphabetMap(0)
  message.split('').forEach(letter => {
    counts[letter] = counts[letter] ? counts[letter] + 1 : 1
  })

  Object.keys(counts).forEach(letter => {
    counts[letter] = counts[letter] / message.length
  })

  return counts
}

function getDigramFrequencies (message) {
  let counts = {}
  for (let i = 0; i < message.length - 1; i++) {
    let digram = message.substring(i, i + 2)
    counts[digram] = counts[digram] ? counts[digram] + 1 : 1
  }

  let top10Entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10)
  let top10Counts = {}
  top10Entries.forEach(entry => { top10Counts[entry[0]] = entry[1] / message.length })

  return top10Counts
}

function getTrigramFrequencies (message) {
  let counts = {}
  for (let i = 0; i < message.length - 2; i++) {
    let digram = message.substring(i, i + 3)
    counts[digram] = counts[digram] ? counts[digram] + 1 : 1
  }

  let top10Entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10)
  let top10Counts = {}
  top10Entries.forEach(entry => { top10Counts[entry[0]] = entry[1] / message.length })

  return top10Counts
}

export { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies }
