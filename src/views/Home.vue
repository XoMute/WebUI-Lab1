<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <PostList :blogPosts="this.$store.state.blogPosts.posts" />
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";

export default {
  name: "Home",
  components: {
    PostList,
  },
};
</script>
