<template>
<div class="cipher-inputs-container">
  <span class="input-label">CYPHERTEXT</span>
  <textarea class="cipher-input ciphertext-input" :value="ciphertext" @input="updateCiphertext"></textarea>

  <div class="subs-worksheet">
    <div v-for="(letter) in alphabet" :key="letter.id">
      <div class="letter">
        {{letter}}
      </div>
      <input class="substitute" maxlength="1" v-bind:id="letter" v-model="map[letter]">
    </div>
  </div>


  <span class="input-label">PLAINTEXT</span>
  <div class="cipher-input plaintext-input" v-html="plaintext" @input="updatePlaintext"></div>
</div>
</template>

<script>
  import { alphabet, buildAlphabetMap } from '@/utils/alphabet'

  export default {

    name: 'cipher-inputs-sub',

    data () {
      return {
        alphabet,
        map: buildAlphabetMap('')
      }
    },

    computed: {
      ciphertext () {
        return this.$store.state.Cipher.ciphertext
      },

      plaintext () {
        var ciphertext = this.$store.state.Cipher.ciphertext
        var results = ''

        for (let i = 0; i < ciphertext.length; i++) {
          if (this.map[ciphertext[i]] !== '') {
            results = results.concat('<span style="color: #E3341B">' + this.map[ciphertext[i]] + '</span>')
          } else {
            results = results.concat(ciphertext[i])
          }
        }

        return results
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
  .substitute {
    border: 1px solid #E3341B;
    background: rgba(255, 255, 255, .15);
    border-radius: 2px;
    color: #E3341B;
    width: 15px;
    font-size: 18px;
    text-align: center;
  }

  .subs-worksheet {
    display: flex;
    justify-content: space-around;
  }

  .letter {
    text-align: center;
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

  .plaintext-input {
    background: white;
    color: #D9D9D9;
  }
</style>
