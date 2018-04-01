<template>
  <div class="application-root">
    <div class="main-content">
      <router-view></router-view>
      <cipher-inputs/>
    </div>
    <nav class="navigation-bar">
      <div class="link-container">
        <router-link class="nav-link" to="/shift">
          <i class="material-icons navigation-icon">keyboard_tab</i>
          <span class="link-text">CAESAR</span>
        </router-link>
        <router-link class="nav-link" to="/vigenere">
          <i class="material-icons navigation-icon">grid_on</i>
          <span class="link-text">VIGENERE</span>
        </router-link>
        <router-link class="nav-link" to="/anagram">
          <i class="material-icons navigation-icon">swap_horiz</i>
          <span class="link-text">ANAGRAM</span>
        </router-link>
        <router-link class="nav-link" to="/columnar">
          <i class="material-icons navigation-icon">view_column</i>
          <span class="link-text">COLUMNAR</span>
        </router-link>
        <router-link class="nav-link" to="/substitution">
          <i class="material-icons navigation-icon">space_bar</i>
          <span class="link-text">SUBSTITUTION</span>
        </router-link>
      </div>
    </nav>
    <div class="frequency-chart-container" :class="{ 'drawer-closed': drawerClosed, 'drawer-open': !drawerClosed }">
        <button class="drawer-handle" @click="toggleDrawer">
            <span>FREQUENCY</span>
        </button>
        <div class="drawer">
            <div class="chart-container">
              <highcharts :options="options"></highcharts>
            </div>
            <div>
              <button @click="showSingleLetterFrequencies">1</button>
              <button @click="showDigramFrequencies">2</button>
              <button @click="showTrigramFrequencies">3</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import CipherInputs from '@/components/cipher-inputs'
  import { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies } from '@/utils/frequency'

  export default {
    name: 'application',
    components: {
      CipherInputs
    },

    computed: {
      getFrequencies () {
        if (this.frequencyMode === 1) {
          return getSingleFrequencies
        } else if (this.frequencyMode === 2) {
          return getDigramFrequencies
        }

        return getTrigramFrequencies
      },

      options () {
        let frequencies = this.getFrequencies(this.$store.state.Cipher.ciphertext)

        return {
          title: {
            text: ''
          },

          xAxis: {
            categories: Object.keys(frequencies),
            lineColor: '#FFFFFF',
            lineWidth: 3,
            tickAmount: 0,
            gridLineColor: 'transparent',
            labels: {
              style: {
                color: '#FFFFFF',
                fontSize: '14px'
              }
            }
          },

          yAxis: {
            title: {
              text: ''
            },
            lineColor: '#FFFFFF',
            lineWidth: 3,
            tickAmount: 0,
            gridLineColor: 'transparent',
            labels: {
              style: {
                color: 'transparent'
              }
            }
          },

          series: [{
            type: 'column',
            data: Object.values(frequencies),
            showInLegend: false,
            dataLabels: {
              color: '#FFFFFF'
            }
          }],

          chart: {
            backgroundColor: 'transparent',
            showAxes: true,
            height: 700,
            width: 1000
          },
          colors: ['#FFFFFF']
        }
      }
    },

    data () {
      return {
        drawerClosed: false,
        frequencyMode: 1
      }
    },

    methods: {
      toggleDrawer () {
        this.drawerClosed = !this.drawerClosed
      },

      showSingleLetterFrequencies () {
        this.frequencyMode = 1
      },

      showDigramFrequencies () {
        this.frequencyMode = 2
      },

      showTrigramFrequencies () {
        this.frequencyMode = 3
      }
    }
  }
</script>

<style lang="scss">
  $drawer-size: calc(100vw * .8);

  body {
    font-family: RobotoDraft, Roboto, sans-serif;
    margin: 0;
    overflow: hidden;
  }

  * {
    outline: none;
  }

  a {
    text-decoration: none;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .application-root {
    background-color: #081830;
    height: 100vh;
    min-width: 650px;
  }

  .main-content {
    display: flex;
    height: calc(100vh - 100px);
  }

  .navigation-bar {
    color: white;
    display: flex;
    justify-content: center;
    height: 100px;
    align-items: center;

    .link-container {
      display: flex;
      width: 700px;
      justify-content: space-around;
    }

    .nav-link {
      width: 100px;
      height: 85px;
      justify-content: center;
      border-top: 10px solid transparent;
    }

    .router-link-active {
      border-top: 10px solid #E3341B;
    }

    .link-text {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 400;
    }

    .navigation-icon {
      font-size: 35px;
    }
  }

  .frequency-chart-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    display: flex;
    align-items: center;
  }

  .drawer-open {
    transform: translate(0px);
    transition: all .5s ease-out;
  }

  .drawer-closed {
      transform: translate($drawer-size);
      transition: all .5s ease-out;
  }

  .drawer-handle {
    height: 500px;
    width: 30px;
    background-color: #E3341B;
    border: none;

    span {
      text-orientation: sideways;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      color: white;
      font-size: 14px;
    }
  }

  .drawer {
    height: 80%;
    width: $drawer-size;
    background-color: #E3341B;
    display: flex;
    align-items: center;
  }

  .highcharts-credits {
    display: none;
  }
</style>
