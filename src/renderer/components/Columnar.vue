<template>
  <div class="view">
    <div class="crypto-tool-list">
      <transposition-tool :headerText="headerText" :decryptionMethod="decipherColumnarTransposition"/>
    </div>
    <div class="inputs">
      <cipher-inputs/>
    </div>
  </div>
</template>

<script>
  import cipherInputs from '@/components/cipher-inputs'
  import TranspositionTool from './transposition-tool'
  import { decipherColumnarTransposition } from '@/utils/transposition'

  export default {
    name: 'columnar',

    components: {
      TranspositionTool,
      cipherInputs
    },

    data () {
      return {
        decipherColumnarTransposition,
        headerText: 'COLUMNS'
      }
    }
  }
</script>

<style>
</style>
