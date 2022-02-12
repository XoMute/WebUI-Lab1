<template>
  <div class="register">
    <h1>Register</h1>
    <p>
      <input
        type="text"
        name="firstname"
        v-model="input.firstname"
        placeholder="First Name"
      />
    </p>
    <p>
      <input
        type="text"
        name="lastname"
        v-model="input.lastname"
        placeholder="Last Name"
      />
    </p>
    <p>
      <input
        type="text"
        name="username"
        v-model="input.username"
        placeholder="Username"
      />
    </p>
    <p>
      <input
        type="password"
        name="password"
        v-model="input.password"
        placeholder="Password"
      />
    </p>
    <button type="button" v-on:click="register()">Register</button>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      input: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      if (this.input.firstname === "" || this.input.lastname === "") {
        console.log("Full name must be set");
        return;
      }
      if (this.input.username !== "" && this.input.password !== "") {
        console.log("Adding user");
        this.$store.dispatch("ADD_USER", this.input);
        this.$router.push("/login");
      } else {
        console.log("Username and password must be set");
      }
    },
  },
};
</script>
