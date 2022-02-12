<template>
  <div id="nav">
    <p class="text-right">
      <template v-if="this.$store.state.currentUser">
        <router-link to="/profile">My Profile</router-link> |
        <router-link
          v-if="this.$store.state.currentUser"
          to="/login"
          v-on:click="this.logout()"
          replace
          >Logout</router-link
        >
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
    </p>
    <router-link to="/home">Home</router-link> |
    <span v-if="this.$store.state.currentUser">
      <router-link to="/create">Create Post</router-link> |
    </span>
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/home");
    },
  },
  beforeMount() {
    // load mock data
    const users = require("./assets/mock-users.json");
    const posts = require("./assets/mock-posts.json");
    users.forEach((user) => this.$store.dispatch("ADD_USER", user));
    posts.forEach((post) => this.$store.dispatch("ADD_POST", post));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  /* display: flex; */
  /* justify-content: center; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
