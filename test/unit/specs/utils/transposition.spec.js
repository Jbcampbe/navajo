import { decipherAnagram, decipherColumnarTransposition, isPermutedColumns } from '@/utils/transposition'

const anagramMessage = 'sithisuetosnatreehmgnaarrpciehkwisrooginrpzrpeyl'
const anagramPlaintext = 'thisistoensuretheanagramcipherisworkingproperlyz'
const anagramPermutation = [6, 3, 1, 2, 5, 4]

const transpositionMessage = 'ttrorpoerryhoeltonrkoqietursciipqsnhmaiisneqisenntpwgrqsucasihoplq'
const transpositionPlaintext = 'thisistoensurethecolumnartranspositioncipherisworkingproperlyqqqqq'
const transpositionPermutation = [1, 2, 3, 4, 5, 6]

const permutationMessage = 'hoelpaisneqsucaunrkoqqisenmoerryqietuetpwgrqttrortciipqsnhmrihoplq'
const permutationPlaintext = 'thisistoensurethecolumnarpermutationcipherisworkingproperlyqqqqqqq'
const permutationPermutation = [2, 6, 5, 3, 1, 4]

describe('transposition.js', () => {
  it('should decrypt an anagram cipher', () => {
    let decryptedMessage = decipherAnagram(anagramMessage, anagramPermutation)
    expect(decryptedMessage).to.equal(anagramPlaintext)
  })

  it('should decrypt a columnar transposition', () => {
    let decryptedMessage = decipherColumnarTransposition(transpositionMessage, transpositionPermutation)
    expect(decryptedMessage).to.equal(transpositionPlaintext)
  })

  it('should decrypt a columnar transposition with column permutation', () => {
    let decryptedMessage = decipherColumnarTransposition(permutationMessage, permutationPermutation)
    expect(decryptedMessage).to.equal(permutationPlaintext)
  })

  it('should recognize permuted columns', () => {
    expect(isPermutedColumns(transpositionPermutation)).to.equal(false)
    expect(isPermutedColumns(permutationPermutation)).to.equal(true)
  })
})
