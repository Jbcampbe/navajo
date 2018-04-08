<template>
  <div id="frequency-chart-container" v-resize:debounce="recomputeChartSize">
    <div class="frequency-chart">
      <highcharts :options="options" ref="highcharts"></highcharts>
    </div>
    <div class="frequency-change-container">
      <button class="change-frequency" :class="{ 'selected': frequencyMode === 1 }" @click="showSingleLetterFrequencies">1</button>
      <button class="change-frequency" :class="{ 'selected': frequencyMode === 2 }" @click="showDigramFrequencies">2</button>
      <button class="change-frequency" :class="{ 'selected': frequencyMode === 3 }" @click="showTrigramFrequencies">3</button>
    </div>
  </div>
</template>

<script>
  import { getSingleFrequencies, getDigramFrequencies, getTrigramFrequencies } from '@/utils/frequency'
  import resize from 'vue-resize-directive'

  export default {
    name: 'frequency-chart',

    directives: {
      resize
    },

    mounted () {
      this.recomputeChartSize()
    },

    data () {
      return {
        frequencyMode: 1
      }
    },

    methods: {
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
        let drawerElem = document.getElementById('frequency-chart-container')
        let chartWidth = drawerElem.clientWidth - 150
        let chartHeight = drawerElem.clientHeight - 50

        this.$refs.highcharts.chart.update({
          chart: {
            width: chartWidth,
            height: chartHeight
          }
        })
      }
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

        let drawerElem = document.getElementById('frequency-chart-container')
        if (drawerElem) {
          let chartWidth = drawerElem.clientWidth - 150
          let chartHeight = drawerElem.clientHeight - 50

          options.chart.width = chartWidth
          options.chart.height = chartHeight
        }

        return options
      }
    }
  }
</script>

<style lang="scss">
  #frequency-chart-container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
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
