<template>
<div class="cipher-inputs-container">
  <span class="input-label">CYPHERTEXT</span>
  <textarea class="cipher-input ciphertext-input" :value="ciphertext" @input="updateCiphertext"></textarea>

  <div class="subs-worksheet">
    <div v-for="(letter) in alphabet" :key="letter.id">
      <div class="letter">
        {{letter}}
      </div>
      <input class="substitute" maxlength="1" v-bind:id="letter" v-bind:class="{ error : errorMap[letter] }" @input="updateMap(letter, $event)">
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
        map: buildAlphabetMap(''),
        errorMap: buildAlphabetMap(false)
      }
    },

    computed: {
      ciphertext () {
        return this.$store.state.Cipher.ciphertext
      },

      plaintext () {
        let ciphertext = this.$store.state.Cipher.ciphertext
        let results = ''

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

      updateMap (letter, e) {
        this.map[letter] = e.target.value

        let values = Object.values(this.map)
        let keys = Object.keys(this.map)
        for (let i = 0; i < values.length; i++) {
          if (values.indexOf(values[i]) !== values.lastIndexOf(values[i]) && values[i] !== '') {
            this.errorMap[keys[i]] = true
          } else {
            this.errorMap[keys[i]] = false
          }
        }
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
    width: 60vw;
  }

  .letter {
    text-align: center;
    color: #A4A6A6;
    font-size: 18px;
  }

  .plaintext-input {
    background: white;
    color: #D9D9D9;
    overflow-x: hidden;
    word-break: break-all;
    white-space: pre-wrap;
    width: calc(60vw - 45px);
    padding-right: 45px;
  }

  .error {
    background: #E3341B;
    color: #353C50;
  }
</style>
