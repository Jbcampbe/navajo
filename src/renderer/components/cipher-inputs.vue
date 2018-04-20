<template>
<div class="cipher-inputs-container">
  <span class="input-label">CYPHERTEXT</span>
  <textarea class="cipher-input ciphertext-input" :value="ciphertext" @input="updateCiphertext"></textarea>

  <span class="input-label">PLAINTEXT</span>
  <textarea class="cipher-input plaintext-input" :value="plaintext" @input="updatePlaintext"></textarea>
</div>
</template>

<script>
  export default {
    name: 'cipher-inputs',

    computed: {
      ciphertext () {
        return this.$store.state.Cipher.ciphertext
      },

      plaintext () {
        return this.$store.state.Cipher.plaintext
      }
    },

    methods: {
      updateCiphertext (e) {
        this.$store.commit('updateCiphertext', e.target.value)
      },

      updatePlaintext (e) {
        this.$store.commit('updatePlaintext', e.target.value)
      }
    }
  }
</script>

<style>
</style>
