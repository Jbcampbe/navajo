<template>
  <div class="view">
    <div class="crypto-tool-list">
    </div>
    <div class="inputs">
      <cipher-inputs-sub/>
    </div>
  </div>
</template>

<script>
  import cipherInputsSub from '@/components/cipher-inputs-sub'
  export default {
    name: 'substitution',
    components: {
      cipherInputsSub
    }
  }
</script>
<style lang="scss">
  .view {
    display: flex;
    width: 100vw;
    height: calc(100vh - 100px);
  }

  .inputs {
    flex: auto;
  }
</style>
