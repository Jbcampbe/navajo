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
    <div class="frequency-menu-container">
    </div>
  </div>
</template>

<script>
  import CipherInputs from '@/components/cipher-inputs'

  export default {
    name: 'application',
    components: {
      CipherInputs
    }
  }
</script>

<style lang="scss">
  body {
    font-family: RobotoDraft, Roboto, sans-serif;
    margin: 0;
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
</style>
