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
        <span>2, 3, 5</span>
      </div>

      <button class="action-btn" v-bind:class = '{open: showLFA}' @click="showLFA = !showLFA">LOW FREQUENCY</button>
      <div class="vigenere-tool kasiki" :class="{ hidden: !showLFA }">
        <span>Possible Key Factors:</span>
        <span>2, 3, 5</span>
      </div>
    </div>
    <div class="inputs">
      <cipher-inputs/>
    </div>
  </div>
</template>

<script>
  // import { decipherVigenere, kasiski, ic, lowFrequencyAnalysis } from '@/utils/polyalphabetic'
  import { kasiski } from '@/utils/polyalphabetic'
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
      incrementIc () {
        this.icLength = this.icLength + 1
      },

      decrementIc () {
        this.icLength = Math.max(0, this.icLength - 1)
      }
    },

    computed: {
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
    height: 70px;
    background-color: #FFFFFF;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    opacity: .8709;
    color: #E3341B;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  }
</style>
