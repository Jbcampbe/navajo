import { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies } from '@/utils/frequency'
import { buildAlphabetMap } from '@/utils/alphabet'

const message = 'thethethethethedadadadadadalslskdididldldldididldld'

const nonZeroSingleFrequencies = {
  a: 0.11764705882352941,
  d: 0.3137254901960784,
  e: 0.09803921568627451,
  h: 0.09803921568627451,
  i: 0.0784313725490196,
  k: 0.0196078431372549,
  l: 0.13725490196078433,
  s: 0.0392156862745098,
  t: 0.09803921568627451
}

const expectedSingleFrequencies = Object.assign(buildAlphabetMap(0), nonZeroSingleFrequencies)

const expectedDigramFrequencies = {
  da: 0.11764705882352941,
  th: 0.09803921568627451,
  dl: 0.09803921568627451,
  he: 0.09803921568627451,
  ld: 0.09803921568627451,
  ad: 0.09803921568627451,
  di: 0.0784313725490196,
  id: 0.0784313725490196,
  et: 0.0784313725490196,
  ls: 0.0392156862745098
}

const expectedTrigramFrequencies = {
  the: 0.09803921568627451,
  dad: 0.09803921568627451,
  ada: 0.09803921568627451,
  dld: 0.09803921568627451,
  eth: 0.0784313725490196,
  het: 0.0784313725490196,
  did: 0.0784313725490196,
  ldl: 0.058823529411764705,
  idi: 0.0392156862745098,
  idl: 0.0392156862745098
}

describe('frequency.js', () => {
  it('should count single frequencies properly', () => {
    let counts = getSingleFrequencies(message)
    expect(Object.keys(counts).length).to.equal(Object.keys(expectedSingleFrequencies).length)
    Object.keys(counts).forEach(letter => {
      expect(counts[letter]).to.equal(expectedSingleFrequencies[letter])
    })
  })

  it('should count double frequencies properly', () => {
    let counts = getDigramFrequencies(message)
    expect(Object.keys(counts).length).to.equal(Object.keys(expectedDigramFrequencies).length)
    Object.keys(counts).forEach(letter => {
      expect(counts[letter]).to.equal(expectedDigramFrequencies[letter])
    })
  })

  it('should count triple frequencies properly', () => {
    let counts = getTrigramFrequencies(message)
    expect(Object.keys(counts).length).to.equal(Object.keys(expectedTrigramFrequencies).length)
    Object.keys(counts).forEach(letter => {
      expect(counts[letter]).to.equal(expectedTrigramFrequencies[letter])
    })
  })
})
