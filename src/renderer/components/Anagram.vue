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
  .crypto-tool-list {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 27px;
    align-items: center;
    min-width: 200px;
  }
  .view {
    display: flex;
    width: 100vw;
    height: calc(100vh - 100px);
  }

  .inputs {
    flex: auto;
  }
</style>
