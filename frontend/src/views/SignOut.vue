<template>
  <div>
    <h1>Sign Out</h1>

    <button id="sign-out" class="btn btn-primary" @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import { $http } from '../utils/http'
export default {
  methods: {
    signOut() {
      console.log("we are in the sign OUT method");
      // Send a DELETE request to the backend
      $http.delete('/sessions')
          .then(response => {
            // Log the user out
            console.log("this is response", response);
            console.log("we are ready to remove sessionId, Sir!");

            // Remove the session token from local storage
            localStorage.removeItem('sessionToken');

            // Redirect to the sign-in page
            this.$router.push('/signin');
          })
          .catch(error => {
            console.error('Failed to sign out:', error);
            // Redirect to the home page anyway
            this.$router.push('/');
          });
    }
  }
}
</script>

<style>
.invisible {
  visibility: hidden;
}
</style>
