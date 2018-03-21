const state = {
  ciphertext: '',
  plaintext: ''
}

const mutations = {
  updatePlaintext (state, newPlaintext) {
    state.plaintext = newPlaintext
  },

  updateCiphertext (state, newCiphertext) {
    state.ciphertext = newCiphertext
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
