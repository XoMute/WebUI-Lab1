<template>
  <div class="container">
    <br>
    <input v-model="this.input.title" type="text" id="title" placeholder="Title"/>
    <br>
    <input v-model="this.input.subtitle" type="text" id="subtitle" placeholder="Subtitle (optional)" maxlength="120"/>
    <br><br>
    <QuillEditor ref="editor" theme="snow"/>
    <br>
    <button type="button" v-on:click="this.createPost()">Create</button>
  </div>
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  
  export default {
    data() {
      return {
        input: {
          title: "",
          subtitle: "",
          created: Date.now(),
        }
      }
    },
    components: {
        QuillEditor
    },
    beforeCreate() {
      if (!this.$store.state.currentUser) {
        this.$router.push("/home");
      }
    },
    methods: {
      createPost() {
        if (this.input.title === "") {
          console.log("Title must be set");
          return;
        }
        const content = this.$refs.editor.getHTML();
        if (!content || content === "") {
          console.log("Post content must be set");
          return;
        }
        this.$store.dispatch("ADD_POST", { ...this.input, content: content });
        this.$router.push("/home");
      }
    }
  }
</script>