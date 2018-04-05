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
    <div class="frequency-chart-container" :class="{ 'drawer-closed': drawerClosed, 'drawer-open': !drawerClosed }" v-resize:debounce="recomputeChartSize">
        <button class="drawer-handle" @click="toggleDrawer">
            <span>FREQUENCY</span>
        </button>
        <div id="drawer">
            <div class="chart-container">
              <highcharts :options="options" ref="highcharts"></highcharts>
            </div>
            <div class="frequency-change-container">
              <button class="change-frequency" :class="{ 'selected': frequencyMode === 1 }" @click="showSingleLetterFrequencies">1</button>
              <button class="change-frequency" :class="{ 'selected': frequencyMode === 2 }" @click="showDigramFrequencies">2</button>
              <button class="change-frequency" :class="{ 'selected': frequencyMode === 3 }" @click="showTrigramFrequencies">3</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import CipherInputs from '@/components/cipher-inputs'
  import { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies } from '@/utils/frequency'
  import resize from 'vue-resize-directive'

  export default {
    name: 'application',
    directives: {
      resize
    },
    components: {
      CipherInputs
    },

    mounted () {
      this.recomputeChartSize()
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

        let options = {
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
            gridLineColor: 'transparent',
            labels: {
              style: {
                color: '#FFFFFF'
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
            showAxes: true
          },
          colors: ['#FFFFFF'],
          tooltip: {
            headerFormat: '<span style="font-size: 14px">{point.key}</span><br/>',
            pointFormat: '<b>{point.y}</b><br/>',
            valueDecimals: 2
          },
          credits: {
            enabled: false
          }
        }

        let drawerElem = document.getElementById('drawer')
        if (drawerElem) {
          let chartWidth = drawerElem.clientWidth - 150
          let chartHeight = drawerElem.clientHeight - 50

          options.chart.width = chartWidth
          options.chart.height = chartHeight
        }

        return options
      }
    },

    data () {
      return {
        drawerClosed: true,
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
      },

      recomputeChartSize () {
        let drawerElem = document.getElementById('drawer')
        let chartWidth = drawerElem.clientWidth - 150
        let chartHeight = drawerElem.clientHeight - 50

        this.$refs.highcharts.chart.update({
          chart: {
            width: chartWidth,
            height: chartHeight
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  $drawer-size: calc(100vw * .75);
  $drawer-translation: calc(100vw * .75 + 20px);

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
      transform: translate($drawer-translation);
      transition: all .5s ease-out;
  }

  .drawer-handle {
    height: 500px;
    width: 50px;
    background-color: #E3341B;
    border: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    span {
      text-orientation: sideways;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      color: white;
      font-size: 14px;
    }
  }

  #drawer {
    height: 75%;
    width: $drawer-size;
    background-color: #E3341B;
    display: flex;
    align-items: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    justify-content: flex-end;
    padding-right: 20px;
    overflow: hidden;
  }

  .change-frequency {
    height: 60px;
    width: 60px;
    background: white;
    border: none;
    border-radius: 3px;
    color: #E3341B;
    font-size: 30px;
    font-weight: 600;

    &.selected {
      background-color: #081830;
    }
  }

  .frequency-change-container {
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: space-around;
  }
</style>
