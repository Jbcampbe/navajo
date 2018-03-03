import { runShifts, decipherCeaser, decipherKeyword } from '@/utils/monoalphabetic'

const shiftMessage = 'bpqaqabwmvaczmbpibbpmapqnbqaewzsqvoxzwxmztg'
const shiftPlaintext = 'thisistoensurethattheshiftisworkingproperly'

const keywordMessage = 'pgaoaopjshoqmspgscswujmetakgsmaoujmcahnkmjksmdw'
const keywordPlaintext = 'thisistoensurethekeywordcipherisworkingproperly'

const letterMap = {
  y: 'a',
  z: 'b',
  t: 'c',
  e: 'd',
  s: 'e',
  i: 'f',
  n: 'g',
  g: 'h',
  a: 'i',
  b: 'j',
  c: 'k',
  d: 'l',
  f: 'm',
  h: 'n',
  j: 'o',
  k: 'p',
  l: 'q',
  m: 'r',
  o: 's',
  p: 't',
  q: 'u',
  r: 'v',
  u: 'w',
  v: 'x',
  w: 'y',
  x: 'z'
}

describe('monoalphabetic.js', () => {
  it('should generate all possible shifts', () => {
    let possibleShifts = runShifts(shiftMessage)
    expect(possibleShifts.length).to.equal(25)
    expect(possibleShifts).to.contain(shiftPlaintext)
  })

  it('should decrypt a ceasar cipher', () => {
    let decryptedMessage = decipherCeaser(shiftMessage, 8)
    expect(decryptedMessage).to.equal(shiftPlaintext)
  })

  it('should decrypt a keyword cipher', () => {
    let decryptedMessage = decipherKeyword(keywordMessage, letterMap)
    expect(decryptedMessage).to.equal(keywordPlaintext)
  })
})
