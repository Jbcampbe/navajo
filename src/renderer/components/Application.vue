<template>
  <div class="main-content">
    Sup World
    <router-link to="/shift">Go to Shift</router-link>
    <router-link to="/vigenere">Go to Vigenere</router-link>
    <router-link to="/anagram">Go to Anagram</router-link>
    <router-link to="/columnar">Go to Columnar</router-link>
    <router-link to="/substitution">Go to Substitution</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'application'
  }
</script>

<style>
</style>
