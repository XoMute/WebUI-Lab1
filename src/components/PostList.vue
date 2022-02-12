<template>
  <ul v-if="this.blogPosts" class="list-group">
    <div v-for="blogPost in this.blogPosts.slice().reverse()" :key="blogPost.id">
     <div class="container">
        <router-link :to="{path: '/posts/' + blogPost.id}" class="list-group-item flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1"><b>{{ blogPost.title }}</b></h4>
            <p class="text-right"><small>By {{ this.getAuthorName(blogPost.authorId) }}</small></p>
          </div>
          <p class="mb-1 lead">{{ blogPost.subtitle }}</p>
          <div class="text-right">
            <small>
              {{ new Intl.DateTimeFormat('en-GB', { dateStyle: "medium", timeStyle: "short" }).format(blogPost.created) }}
            </small>
          </div>
        </router-link>
      </div>
    </div>
  </ul>
  <div v-else>
    <h3>There are no posts!</h3>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    blogPosts: Array
  },
  methods: {
    getAuthorName(authorId) {
      const author = this.$store.state.users.findById(authorId);
      return `${author.firstname} ${author.lastname}`;
    }
  }
}
</script>