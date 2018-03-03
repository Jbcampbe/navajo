import { decipherAnagram } from '@/utils/transposition'

const anagramMessage = 'sithisuetosnatreehmgnaarrpciehkwisrooginrpzrpeyl'
const anagramPlaintext = 'thisistoensuretheanagramcipherisworkingproperly'
const anagramPermutation = [5, 2, 0, 1, 4, 3]

describe('transposition.js', () => {
  it('should decrypt an anagram cipher', () => {
    let decryptedMessage = decipherAnagram(anagramMessage, anagramPermutation)
    expect(decryptedMessage).to.equal(`${anagramPlaintext}z`)
  })
})
