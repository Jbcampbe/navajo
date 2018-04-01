<template>
  <div class="crypto-tool-list">
    <transposition-tool :headerText="headerText" :decryptionMethod="decipherAnagram"/>
  </div>
</template>

<script>
  import TranspositionTool from './transposition-tool'
  import { decipherAnagram } from '@/utils/transposition'

  export default {
    name: 'anagram',

    components: {
      TranspositionTool
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
</style>
