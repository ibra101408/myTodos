

<script>
import { $http } from '../utils/http'
//import { useSession } from 'pinia';
//import { useSession } from '../../../backend/routes/sessionsRoutes';

//const store = useSession();

export default {
  data() {
    return {
      signInEmail: '',
      signInPassword: ''
    }
  },
  methods: {
    signIn() {
      console.log("we are in the sign In method");
      // Send a POST request to the backend
      $http.post('/sessions', {
        email: this.signInEmail,
        password: this.signInPassword
      })
          .then(response => {
            // save session token
            localStorage.setItem('sessionToken', response.sessionToken)
            /*const store = useStore();
            store.setToken(response.sessionId);*/


            this.$router.push('/')
          })
          .catch(error => {
            //alert(error.response.data)
            console.error('Failed to sign in:', error)
          })
    }
  }
}
</script>

<template>
  <div>
    <h1>Sign In</h1>

    <!-- Email -->
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input type="text" name="email" placeholder="Type here" class="input input-bordered w-full max-w-xs"
             v-model="signInEmail"/>
    </div>

    <!-- Password -->
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input type="password" name="password" placeholder="Type here" class="input input-bordered w-full max-w-xs"
             v-model="signInPassword"/>
    </div>

    <div class="h-30">&nbsp;</div>
    <button id="sign-in" class="btn btn-primary" @click="signIn">Sign In</button>
  </div>
<!--  <ul>
    <li for="session store.sessionId"></li>
  </ul>-->
</template>


<style>
.invisible {
  visibility: hidden;
}
</style>
