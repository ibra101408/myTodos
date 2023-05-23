

<template>
  <div id="app">
    <nav>
      <router-link to="/signout">Sign Out</router-link>
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
     <!-- <router-link v-if="isLoggedIn" to="/signout">Sign Out</router-link>
      <router-link v-if="isLoggedIn" to="/signup">Sign Up</router-link>
      <router-link v-if="isLoggedIn" to="/signin">Sign In</router-link>-->
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>

<script>

const sessionToken = localStorage.getItem('sessionToken');

export default {
  computed: {
    isLoggedIn() {
      return localStorage.getItem('sessionToken') !== null;
    }
  },
  name: 'App',
  data() {
    return {
      sessionToken: sessionToken,
    }
  }
}
</script>
