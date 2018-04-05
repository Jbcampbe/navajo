<template>
<div class="cipher-inputs-container">
  <span class="input-label">CYPHERTEXT</span>
  <textarea class="cipher-input ciphertext-input" :value="ciphertext" @input="updateCiphertext"></textarea>

  <div class="subs-worksheet">
    <div v-for="letter in alphabet" class="letter">
      {{letter}}
    </div>
  </div>


  <span class="input-label">PLAINTEXT</span>
  <textarea class="cipher-input plaintext-input" :value="plaintext" @input="updatePlaintext"></textarea>
</div>
</template>

<script>
  import { alphabet } from '@/utils/alphabet'

  export default {

    name: 'cipher-inputs-sub',

    data () {
      return {
        alphabet
      }
    },

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
  .subs-worksheet {
    display: flex;
    justify-content: space-between;
  }

  .letter {
    color: #A4A6A6;
    font-size: 18px;
  }

  .cipher-inputs-container {
    display: flex;
    flex-direction: column;
    width: 60%;
  }

  .input-label {
    color: #A4A6A6;
    margin-top: 30px;
    margin-bottom: 5px;
    padding-left: 19px;
  }

  .cipher-input {
    resize: none;
    height: 300px;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid #707070;
  }
</style>
