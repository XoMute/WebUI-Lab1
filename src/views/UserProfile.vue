<template>
  <div class="profile">
    <h1>My Profile</h1>
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
    <button type="button" v-on:click="update()">Update</button>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
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
  beforeMount() {
    this.input = Object.assign({}, this.$store.state.currentUser); // copy user object to prevent mutations
  },
  methods: {
    update() {
      if (this.input.firstname === "" || this.input.lastname === "") {
        console.log("Full name must be set");
        return;
      }
      if (this.input.username !== "" && this.input.password !== "") {
        this.$store.dispatch("UPDATE_USER", this.input);
        console.log("User details updated.");
      } else {
        console.log("Username and password must be set");
      }
    },
  },
};
</script>
