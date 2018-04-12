<template>
  <div class="view">
    <div class="crypto-tool-list">
    </div>
    <div class="inputs">
        <cipher-inputs/>
    </div>
  </div>
</template>

<script>
  import cipherInputs from '@/components/cipher-inputs'

  export default {
    name: 'vigenere',

    components: {
      cipherInputs
    }
  }
</script>

<style>
  .view {
    display: flex;
    width: 100vw;
    height: calc(100vh - 100px);
  }

  .inputs {
    flex: auto;
  }
</style>
