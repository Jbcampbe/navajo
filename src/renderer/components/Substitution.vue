<template>
  <div class="crypto-tool-list">
    <div class="letter" v-for="letter in alphabet">
      {{letter}}
    </div>
  </div>
</template>

<script>
  import {alphabet} from '@/utils/alphabet'

  export default {
    name: 'substitution',
    data () {
      return {
        alphabet: alphabet
      }
    }
  }
</script>

<style lang="scss">
.letter {
  font-size: 17px;
  color: #A4A6A6;
  text-align: left;
}
</style>
