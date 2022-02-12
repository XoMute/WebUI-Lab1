<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div>
          <h1>
            {{ this.title }}
          </h1>
          <div v-if="this.created && this.created !== ''">
            <h4>
              Published on
              {{
                new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(this.created)
              }}
            </h4>
          </div>
        </div>
      </div>
      <div class="col-md-6 text-right">
        <h4>Author: {{ this.author.firstname }} {{ this.author.lastname }}</h4>
        <div v-if="this.isAuthor()">
          <button type="button" v-on:click="this.delete()">Delete</button>
        </div>
      </div>
    </div>
    <div class="row text-left border border-primary">
      <div class="col-md-10">
        <p v-if="this.subtitle" v-html="this.subtitle"></p>
        <span v-html="this.content"></span>
      </div>
    </div>
    <h3>Comments</h3>
    <ul v-if="this.comments" class="list-group">
      <div v-for="comment in this.comments" :key="comment.id">
        <div class="container text-left list-group-item">
          <div>
            <h4 class="mb-1">
              <b>{{ comment.name }}</b>
            </h4>
          </div>
          <p class="mb-1 lead">{{ comment.content }}</p>
        </div>
      </div>
    </ul>
    <!-- Add comment -->
    <br />
    <div>
      <div class="row">
        <input
          type="text"
          name="name"
          v-model="this.input.name"
          placeholder="Your Name..."
        />
      </div>
      <div class="row">
        <textarea
          v-model="this.input.content"
          rows="5"
          cols="35"
          placeholder="Please, input Your comment..."
        >
        </textarea>
      </div>
      <button type="button" v-on:click="this.addComment()">Add comment</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPost",
  data() {
    return {
      postId: this.$route.params.postId,
      title: "",
      subtitle: "",
      author: undefined,
      created: "",
      content: "",
      comments: [],
      input: {
        name: "",
        content: "",
      },
    };
  },
  beforeMount() {
    const post = this.$store.state.blogPosts.findById(this.postId);
    this.title = post.title;
    this.subtitle = post.subtitle;
    this.author = this.$store.state.users.findById(post.authorId);
    this.created = post.created;
    this.content = post.content;
    this.comments = post.comments;
  },
  methods: {
    addComment() {
      if (!this.input.name) {
        console.log("Name must be set");
        return;
      }
      if (!this.input.content) {
        console.log("Comment must be set");
        return;
      }
      this.$store.dispatch("ADD_COMMENT", {
        postId: this.postId,
        comment: this.input,
      });
    },
    isAuthor() {
      return (
        this.$store.state.currentUser &&
        this.$store.state.currentUser.id === this.author.id
      );
    },
    delete() {
      this.$store.dispatch("DELETE_POST", this.postId);
      this.$router.push("/home");
    },
  },
};
</script>
