import { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies } from '@/utils/frequency'
import { buildAlphabetMap } from '@/utils/alphabet'

const message = 'thesecrettocountingfrequencies'

const expectedSingleCounts = Object.assign(buildAlphabetMap(0), { t: 4, h: 1, e: 6, s: 2, c: 3, r: 2, o: 2, u: 2, n: 3, i: 2, g: 1, f: 1, q: 1 })

const expectedDigramCounts = {
  th: 1,
  he: 1,
  es: 2,
  se: 1,
  ec: 1,
  cr: 1,
  re: 2,
  et: 1,
  tt: 1,
  to: 1,
  oc: 1,
  co: 1,
  ou: 1,
  un: 1,
  nt: 1,
  ti: 1,
  in: 1,
  ng: 1,
  gf: 1,
  fr: 1,
  eq: 1,
  qu: 1,
  ue: 1,
  en: 1,
  nc: 1,
  ci: 1,
  ie: 1
}

const expectedTrigramCounts = {
  the: 1,
  hes: 1,
  ese: 1,
  sec: 1,
  ecr: 1,
  cre: 1,
  ret: 1,
  ett: 1,
  tto: 1,
  toc: 1,
  oco: 1,
  cou: 1,
  oun: 1,
  unt: 1,
  nti: 1,
  tin: 1,
  ing: 1,
  ngf: 1,
  gfr: 1,
  fre: 1,
  req: 1,
  equ: 1,
  que: 1,
  uen: 1,
  enc: 1,
  nci: 1,
  cie: 1,
  ies: 1
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
