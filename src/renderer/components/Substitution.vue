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
<style>
</style>
