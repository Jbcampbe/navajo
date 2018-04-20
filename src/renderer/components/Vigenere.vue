<template>
  <div class="crypto-tool-list">
    <button class="action-btn" @click="showKasiski = !showKasiski">KASISKI</button>
    <div class="vigenere-tool kasiki" :class="{ hidden: !showKasiski }">
      <span>Possible Key Factors:</span>
      <div class="factor-container">
        <span v-for="(factor, index) in kasiskiFactors">
          {{index !== kasiskiFactors.length - 1 ? `${factor},` : factor}}
        </span>
      </div>
    </div>

    <button class="action-btn" @click="showIC = !showIC">IC</button>
    <div class="vigenere-tool kasiki" :class="{ hidden: !showIC }">
      <span>Possible Key Factors:</span>
      <span>2, 3, 5</span>
    </div>

    <button class="action-btn" @click="showLFA = !showLFA">LOW FREQUENCY</button>
    <div class="vigenere-tool kasiki" :class="{ hidden: !showLFA }">
      <span>Possible Key Factors:</span>
      <span>2, 3, 5</span>
    </div>
  </div>
</template>

<script>
  // import { decipherVigenere, kasiski, ic, lowFrequencyAnalysis } from '@/utils/polyalphabetic'
  import { kasiski } from '@/utils/polyalphabetic'

  export default {
    name: 'vigenere',
    data () {
      return {
        showKasiski: false,
        showIC: false,
        showLFA: false
      }
    },

    computed: {
      kasiskiFactors () {
        return kasiski(this.$store.state.Cipher.ciphertext)
      }
    }
  }
</script>

<style lang="scss">
  .crypto-tool-list {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 27px;
    align-items: center;
    min-width: 200px;
  }

  .action-btn {
    width: 100%;
    max-width: 250px;
    height: 65px;
    background-color: #E3341B;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 17px;
    margin-top: 30px;
    cursor: pointer;
    outline: none;
  }

  .vigenere-tool {
    width: 100%;
    max-width: 250px;
    height: 85px;
    background-color: #FFFFFF;
    border-radius: 4px;
    opacity: .8709;
    color: #E3341B;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .kasiski {

  }

  .hidden {
    display: none;
  }
</style>
