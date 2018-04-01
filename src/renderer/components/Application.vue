<template>
  <div class="application-root">
    <div class="main-content">
      <router-view></router-view>
      <cipher-inputs/>
    </div>
    <nav class="navigation-bar">
      <div class="link-container">
        <router-link to="/shift">
          <i class="material-icons navigation-icon">keyboard_tab</i>
          <span class="link-text">CAESAR</span>
        </router-link>
        <router-link to="/vigenere">
          <i class="material-icons navigation-icon">grid_on</i>
          <span class="link-text">VIGENERE</span>
        </router-link>
        <router-link to="/anagram">
          <i class="material-icons navigation-icon">swap_horiz</i>
          <span class="link-text">ANAGRAM</span>
        </router-link>
        <router-link to="/columnar">
          <i class="material-icons navigation-icon">view_column</i>
          <span class="link-text">COLUMNAR</span>
        </router-link>
        <router-link to="/substitution">
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
            <span>Drawer</span>
        </div>
    </div>
  </div>
</template>

<script>
  import CipherInputs from '@/components/cipher-inputs'

  export default {
    name: 'application',
    components: {
      CipherInputs
    },

    data () {
      return {
        drawerClosed: true
      }
    },

    methods: {
      toggleDrawer () {
        this.drawerClosed = !this.drawerClosed
      }
    }
  }
</script>

<style lang="scss">
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

    a {
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
      transform: translate(900px);
      transition: all .5s ease-out;
  }

  .drawer-handle {
    height: 500px;
    width: 30px;
    background-color: red;
    border: none;

    span {
      text-orientation: sideways;
      writing-mode: vertical-lr;
    }
  }

  .drawer {
    height: 80%;
    width: 900px;
    background-color: red;
  }
</style>
