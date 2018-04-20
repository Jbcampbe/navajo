<template>
  <div class="view">
    <div class="crypto-tool-list">
      <transposition-tool :headerText="headerText" :decryptionMethod="decipherAnagram"/>
    </div>
    <div class="inputs">
      <cipher-inputs/>
    </div>
  </div>
</template>

<script>
  import cipherInputs from '@/components/cipher-inputs'
  import TranspositionTool from './transposition-tool'
  import { decipherAnagram } from '@/utils/transposition'

  export default {
    name: 'anagram',

    components: {
      TranspositionTool,
      cipherInputs
    },

    data () {
      return {
        decipherAnagram,
        headerText: 'BLOCK'
      }
    }
  }
</script>

<style>
</style>
