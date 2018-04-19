import { buildAlphabetMap } from '@/utils/alphabet'

const englishFrequencies = {
  a: .08167,
  b: .01492,
  c: .02782,
  d: .04253,
  e: .12702,
  f: .02228,
  g: .02015,
  h: .06094,
  i: .06966,
  j: .00153,
  k: .00772,
  l: .04025,
  m: .02406,
  n: .06749,
  o: .07507,
  p: .01929,
  q: .00095,
  r: .05987,
  s: .06327,
  t: .09056,
  u: .02758,
  v: .00978,
  w: .02360,
  x: .00150,
  y: .01974,
  z: .00074
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
