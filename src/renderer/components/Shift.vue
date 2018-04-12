<template>
  <div class="view">
    <div class="crypto-tool-list">
      <button class="action-btn" v-on:click="openShiftModal">SHIFT</button>
      <button class="action-btn" v-on:click="openShiftAllModal">SHIFT ALL</button>
      <vodal :show="showShiftModal" animation="fade" @hide="showShiftModal=false" :closeButton="false" :width="300" :height="140">
          <div class="shift-modal">
            <div class="shift-modal-body">
              <span class="enter-shift-text">Enter shift amount</span>
              <input class="shift-input" v-model="shiftAmt"/>
            </div>
            <div class="shift-modal-footer">
              <button class="modal-btn cancel" v-on:click="closeShiftModal">CANCEL</button>
              <button class="modal-btn shift" v-on:click="performShift">SHIFT</button>
            </div>
          </div>
      </vodal>

      <vodal :show="showShiftAllModal" animation="fade" @hide="showShiftAllModal=false" :closeButton="false" :width="600" :height="340">
        <div class="shift-modal">
          <div class="scrollable">
            <div class="shift-container" v-for="(shift, index) in allShifts" :key="shift.id">
              <span class="shift-index">{{index + 1}}</span>
              <span class="shift-text">{{shift}}</span>
            </div>
          </div>
          <div class="shift-all-modal-footer">
            <button class="close-all-shifts-btn" v-on:click="closeShiftAllModal">DONE</button>
          </div>
        </div>
      </vodal>
    </div>
    <div class="inputs">
        <cipher-inputs/>
    </div>
  </div>
</template>

<script>
  import Vodal from 'vodal'
  import cipherInputs from '@/components/cipher-inputs'
  import { decipherCeaser, runShifts } from '@/utils/monoalphabetic'

  export default {
    name: 'shift',

    data () {
      return {
        showShiftModal: false,
        showShiftAllModal: false,
        shiftAmt: 1
      }
    },
    components: {
      Vodal,
      cipherInputs
    },
    computed: {
      allShifts () {
        return runShifts(this.$store.state.Cipher.ciphertext)
      }
    },
    methods: {
      openShiftModal () {
        this.showShiftModal = true
      },

      closeShiftModal () {
        this.showShiftModal = false
      },

      openShiftAllModal () {
        this.showShiftAllModal = true
      },

      closeShiftAllModal () {
        this.showShiftAllModal = false
      },

      performShift () {
        let decryptedMessage = decipherCeaser(this.$store.state.Cipher.ciphertext, this.shiftAmt)
        this.$store.commit('updatePlaintext', decryptedMessage)
        this.closeShiftModal()
      }
    }
  }
</script>

<style lang="scss">
  .crypto-tool-list {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 27px;
    align-items: center;
    min-width: 200px;
  }

  .action-btn {
    width: 100%;
    max-width: 250px;
    height: 65px;
    background-color: #E3341B;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 17px;
    margin-top: 30px;
    cursor: pointer;
    outline: none;
  }

  .shift-container {
    word-wrap: break-word;
    padding: 0 5px 0 5px;
    color: #A4A6A6;
    display: flex;
    margin-top: 20px;
  }

  .scrollable {
    overflow-y: scroll;
    height: calc(100% - 30px);
  }

  .shift-modal {
    height: 100%;
  }

  .shift-all-modal-footer {
    display: flex;
    justify-content: center;
    height: 35px;
    align-items: center;
  }

  .shift-modal-footer {
    display: flex;
    justify-content: space-around;
    height: 35px;
    align-items: center;
  }

  .shift-text {
    display: block;
    max-width: 80%;
  }

  .shift-index {
    width: 30px;
  }

  .close-all-shifts-btn {
    width: 100px;
    height: 30px;
    background-color: #081830;
    color: white;
    border: none;
    font-size: 13px;
  }

  .shift-modal-body {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: calc(100% - 35px);
    justify-content: center;
  }

  .enter-shift-text {
    color: #081830;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .modal-btn {
    height: 30px;
    width: 80px;
    border: none;
    color: white;
    font-size: 14px;
  }

  .shift {
    background-color: #081830;
  }

  .cancel {
    background-color: #E3341B;
  }

  .shift-input {
    width: 35px;
    height: 25px;
    font-size: 25px;
    outline: none;
    border-radius: 3px;
    border: 1px solid #081830;
    text-align: center;
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
