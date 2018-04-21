<template>
  <div class="view">
    <div class="crypto-tool-list">
      <button class="action-btn" v-bind:class = '{open: showKasiski}' @click="showKasiski = !showKasiski">KASISKI</button>
      <div class="vigenere-tool kasiki" :class="{ hidden: !showKasiski }">
        <span>Possible Key Factors:</span>
        <div class="factor-container">
          <span v-for="(factor, index) in kasiskiFactors">
            {{index !== kasiskiFactors.length - 1 ? `${factor},` : factor}}
          </span>
        </div>
      </div>

      <button class="action-btn" v-bind:class = '{open: showIC}' @click="showIC = !showIC">IC</button>
      <div class="vigenere-tool kasiki" :class="{ hidden: !showIC }">
        <div class="ic-header">
          <span>Key length:</span>
          <button class="material-icons change-ic-arrow" @click="decrementIc"> keyboard_arrow_left </button>
          <div class='ic-length'>{{icLength}}</div>
          <button class="material-icons change-ic-arrow" @click="incrementIc"> keyboard_arrow_right </button>
        </div>
        <div class="coefficient-container">
          <span v-for="(factor, index) in icCoefficients">
            {{index}} |
            {{factor}}
          </span>
        </div>
      </div>

      <button class="action-btn" v-bind:class = '{open: showLFA}' @click="showLFA = !showLFA">LOW FREQUENCY</button>
      <div class="vigenere-tool kasiki" :class="{ hidden: !showLFA }">
        <span>Possible Key:</span>
        <span>{{possibleKey}}</span>
      </div>
      <input class="vigenere-input" placeholder="enter keyword" @input="solveVigenere"/>
    </div>
    <div class="inputs">
      <cipher-inputs/>
    </div>
  </div>
</template>

<script>
  // import { decipherVigenere, kasiski, ic, lowFrequencyAnalysis } from '@/utils/polyalphabetic'
  import { kasiski, ic, lowFrequencyAnalysis, decipherVigenere } from '@/utils/polyalphabetic'
  import cipherInputs from '@/components/cipher-inputs'

  export default {
    name: 'vigenere',
    components: {
      cipherInputs
    },

    data () {
      return {
        showKasiski: false,
        showIC: false,
        showLFA: false,
        icLength: 5
      }
    },

    methods: {
      solveVigenere (e) {
        this.$store.commit('updatePlaintext', decipherVigenere(this.$store.state.Cipher.ciphertext, e.target.value))
      },

      incrementIc () {
        this.icLength = this.icLength + 1
      },

      decrementIc () {
        this.icLength = Math.max(1, this.icLength - 1)
      }
    },

    computed: {
      possibleKey () {
        return lowFrequencyAnalysis(this.$store.state.Cipher.ciphertext, this.icLength)
      },

      icCoefficients () {
        return ic(this.$store.state.Cipher.ciphertext, this.icLength)
      },

      kasiskiFactors () {
        if (kasiski(this.$store.state.Cipher.ciphertext).length > 0) {
          return kasiski(this.$store.state.Cipher.ciphertext)
        } else {
          return '-'
        }
      }
    }
  }
</script>

<style lang="scss">
  .vigenere-tool {
    width: 100%;
    max-width: 250px;
    max-height: 120px;
    background-color: #FFFFFF;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    opacity: .8709;
    color: #E3341B;
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
  }

  .kasiski {

  }

  .change-ic-arrow {
    color: #E3341B;
    width: 30px;
    font-size: 30px;
    padding: 0;
    background: transparent;
    border: none;
    line-height: 10px;
    height: 20px;
    text-align: center;
  }

  .vigenere-input {
    width: 100%;
    max-width: 250px;
    height: 45px;
    background-color: white;
    color: #081830;
    border: none;
    border-radius: 4px;
    font-size: 17px;
    margin-top: 15px;
    outline: none;
    text-align: center;
  }

  .hidden {
    display: none;
  }

  .ic-length {
    text-align: center;
    background-color: white;
    display: inline-block;
    opacity: 1;
    color: #081830;
    font-size: 18px;
  }

  .open {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .ic-header {
    display: flex;
    height: 25px;
    flex-shrink: 0;
  }

  .coefficient-container {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
</style>
