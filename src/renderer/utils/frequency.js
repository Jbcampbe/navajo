import { buildAlphabetMap } from '@/utils/alphabet'

const englishFrequencies = {
  a: 0.08167,
  b: 0.01492,
  c: 0.02782,
  d: 0.04253,
  e: 0.12702,
  f: 0.02228,
  g: 0.02015,
  h: 0.06094,
  i: 0.06966,
  j: 0.00153,
  k: 0.00772,
  l: 0.04025,
  m: 0.02406,
  n: 0.06749,
  o: 0.07507,
  p: 0.01929,
  q: 0.00095,
  r: 0.05987,
  s: 0.06327,
  t: 0.09056,
  u: 0.02758,
  v: 0.00978,
  w: 0.02360,
  x: 0.00150,
  y: 0.01974,
  z: 0.00074
}

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

export { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies, englishFrequencies }
