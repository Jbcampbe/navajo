<template>
<div class="cipher-inputs-container">
  <span class="input-label">CYPHERTEXT</span>
  <textarea class="cipher-input ciphertext-input" v-model="ciphertext"></textarea>

  <span class="input-label">PLAINTEXT</span>
  <textarea class="cipher-input plaintext-input" v-model="plaintext"></textarea>
</div>
</template>

<script>
  export default {
    name: 'cipher-inputs',
    data () {
      return {
        ciphertext: this.$store.state.Cipher.ciphertext,
        plaintext: this.$store.state.Cipher.plaintext
      }
    }
  }
</script>

<style lang="scss">
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
