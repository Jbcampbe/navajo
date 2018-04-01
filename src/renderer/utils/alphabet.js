const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const alphabetMap = {}
alphabet.forEach(letter => { alphabetMap[letter] = ' ' })

function buildAlphabetMap (fill) {
  let alphabetMap = {}
  alphabet.forEach(letter => { alphabetMap[letter] = fill })
  return alphabetMap
}

export { alphabet, buildAlphabetMap }
