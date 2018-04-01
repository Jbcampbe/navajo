import { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies } from '@/utils/frequency'
import { buildAlphabetMap } from '@/utils/alphabet'

const message = 'thethethethethedadadadadadalslskdididldldldididldld'

const expectedSingleCounts = Object.assign(buildAlphabetMap(0), { a: 6, d: 16, e: 5, h: 5, i: 4, k: 1, l: 7, s: 2, t: 5 })

const expectedDigramCounts = {
  da: 6,
  th: 5,
  dl: 5,
  he: 5,
  ld: 5,
  ad: 5,
  di: 4,
  id: 4,
  et: 4,
  ls: 2
}

const expectedTrigramCounts = {
  the: 5,
  dad: 5,
  ada: 5,
  dld: 5,
  eth: 4,
  het: 4,
  did: 4,
  ldl: 3,
  idi: 2,
  idl: 2
}

describe('frequency.js', () => {
  it('should count single frequencies properly', () => {
    let counts = getSingleFrequencies(message)
    expect(Object.keys(counts).length).to.equal(Object.keys(expectedSingleCounts).length)
    Object.keys(counts).forEach(letter => {
      expect(counts[letter]).to.equal(expectedSingleCounts[letter])
    })
  })

  it('should count double frequencies properly', () => {
    let counts = getDigramFrequencies(message)
    expect(Object.keys(counts).length).to.equal(Object.keys(expectedDigramCounts).length)
    Object.keys(counts).forEach(letter => {
      expect(counts[letter]).to.equal(expectedDigramCounts[letter])
    })
  })

  it('should count triple frequencies properly', () => {
    let counts = getTrigramFrequencies(message)
    expect(Object.keys(counts).length).to.equal(Object.keys(expectedTrigramCounts).length)
    Object.keys(counts).forEach(letter => {
      expect(counts[letter]).to.equal(expectedTrigramCounts[letter])
    })
  })
})
