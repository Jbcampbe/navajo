<template>
  <div class="crypto-tool-list">
    <transposition-tool :headerText="headerText" :decryptionMethod="decipherColumnarTransposition"/>
  </div>
</template>

<script>
  import TranspositionTool from './transposition-tool'
  import { decipherColumnarTransposition } from '@/utils/transposition'

  export default {
    name: 'columnar',

    components: {
      TranspositionTool
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
  .crypto-tool-list {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 27px;
    align-items: center;
    min-width: 200px;
  }
</style>
