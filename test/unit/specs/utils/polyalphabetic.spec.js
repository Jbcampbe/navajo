import { decipherVigenere } from '@/utils/polyalphabetic'

const vigenereMessage = 'momcmqbgwuwlcsvrtaxritqywuiipqkzalvgspskhysgpfni'
const vigenerePlaintext = 'thisistoensurethatthevigenerecipherworksproperly'
const vigenereKeyword = 'thekeyissherlock'

describe('polyalphabetic.js', () => {
  it('should decrypt vigenere ciphers', () => {
    let decryptedMessage = decipherVigenere(vigenereMessage, vigenereKeyword)
    expect(decryptedMessage).to.equal(vigenerePlaintext)
  })
})
