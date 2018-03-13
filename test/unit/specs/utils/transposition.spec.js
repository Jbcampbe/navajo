import { decipherAnagram, decipherColumnarTransposition } from '@/utils/transposition'

const anagramMessage = 'sithisuetosnatreehmgnaarrpciehkwisrooginrpzrpeyl'
const anagramPlaintext = 'thisistoensuretheanagramcipherisworkingproperly'
const anagramPermutation = [5, 2, 0, 1, 4, 3]

const transpositionMessage = 'ttrorpoerryhoeltonrkoqietursciipqsnhmaiisneqisenntpwgrqsucasihoplq'
const transpositionPlaintext = 'thisistoensurethecolumnartranspositioncipherisworkingproperly'
const transpositionPermutation = [1, 2, 3, 4, 5, 6]

const permutationMessage = 'ttrortciiphoelpaisneietuetpwgrsnhmrihoplisenmoerrysucaunrkoq'
const permutationPlaintext = 'thisistoensurethecolumnarpermutationcipherisworkingproperly'
const permutationPermutation = [2, 6, 5, 3, 1, 4]

describe('transposition.js', () => {
  it('should decrypt an anagram cipher', () => {
    let decryptedMessage = decipherAnagram(anagramMessage, anagramPermutation)
    // the extra z is due to the fact that the length of the message is not a factor of the block size
    // this is consistent with CAP
    expect(decryptedMessage).to.equal(`${anagramPlaintext}z`)
  })

  it('should decrypt a columnar transposition', () => {
    let decryptedMessage = decipherColumnarTransposition(transpositionMessage, transpositionPermutation)
    // decrypted message will be padded with q's according to the algorithm
    expect(decryptedMessage).to.equal(`${transpositionPlaintext}qqqqq`)
  })

  it('should decrypt a columnar transposition with column permutation', () => {
    let decryptedMessage = decipherColumnarTransposition(permutationMessage, permutationPermutation)
    // decrypted message will be padded with q's according to the algorithm
    expect(decryptedMessage).to.equal(`${permutationPlaintext}q`)
  })
})
