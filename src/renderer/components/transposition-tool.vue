<template>
  <div class="transposition-tool">
    <div class="block-header">
      <span class="text-header">{{headerText}}:</span>
      <div class="block-size-container">
        <button class="material-icons change-block-size-arrow" @click="incrementBlockSize"> keyboard_arrow_up </button>
        <span>{{blockSize}}</span>
        <button class="material-icons change-block-size-arrow" @click="decrementBlockSize"> keyboard_arrow_down </button>
      </div>
    </div>
    <draggable class="block-container" v-model="blocks" @start="drag=true" @end="onDragEnd">
       <div class="block" v-for="element in blocks" :key="element">{{element}}</div>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'transposition-tool',
    props: ['headerText', 'decryptionMethod'],

    data () {
      let blockSize = 6

      return {
        blockSize,
        blocks: this.createBlocks(blockSize)
      }
    },

    methods: {
      onDragEnd () {
        this.drag = false
        let decryptedMessage = this.decryptionMethod(this.$store.state.Cipher.ciphertext, this.blocks)
        this.$store.commit('updatePlaintext', decryptedMessage)
      },

      incrementBlockSize () {
        if (this.blockSize < 18) {
          this.blockSize++
          this.blocks = this.createBlocks(this.blockSize)
          let decryptedMessage = this.decryptionMethod(this.$store.state.Cipher.ciphertext, this.blocks)
          this.$store.commit('updatePlaintext', decryptedMessage)
        }
      },

      decrementBlockSize () {
        if (this.blockSize > 1) {
          this.blockSize--
          this.blocks = this.createBlocks(this.blockSize)
          let decryptedMessage = this.decryptionMethod(this.$store.state.Cipher.ciphertext, this.blocks)
          this.$store.commit('updatePlaintext', decryptedMessage)
        }
      },

      createBlocks (blockSize) {
        let blocks = []
        for (let i = 1; i <= blockSize; i++) {
          blocks.push(i)
        }

        return blocks
      }
    },

    components: {
      draggable
    }
  }
</script>

<style lang="scss">
  .transposition-tool {
    width: 100%;
    max-width: 250px;
    min-height: 100px;
    background-color: #E3341B;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 17px;
    margin-top: 30px;
    cursor: pointer;
    outline: none;
  }

  .block-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .block {
    height: 30px;
    display: flex;
    background-color: white;
    color: #A4A6A6;
    border-radius: 4px;
    flex: 0 0 25px;
    justify-content: center;
    margin: 5px;
    align-items: center;
    margin-right: 3px;
  }

  .block-size-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .block-header {
    display: flex;
    align-items: center;
    padding: 1px;
  }

  .text-header {
    margin-left: 10px;
  }

  .change-block-size-arrow {
    height: 10px;
    width: 20px;
    font-size: 20px;
    padding: 0;
    background: transparent;
    border: none;
    color: white;
    line-height: 10px;
  }
</style>
