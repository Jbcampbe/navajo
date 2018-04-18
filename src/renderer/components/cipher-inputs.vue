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

<style lang="scss">
  .cipher-inputs-container {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .input-label {
    color: #A4A6A6;
    margin-top: 30px;
    margin-bottom: 5px;
    padding-left: 19px;
  }

  .cipher-input {
    resize: none;
    height: 30vh;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid #707070;
  }
</style>
