import { createStore } from "vuex";
import PostList from "@/cls/model/PostList.js";
import UserList from "../cls/model/UserList.js";

export default createStore({
  state: {
    blogPosts: new PostList(),
    users: new UserList(),
    currentUser: null,
  },
  mutations: {
    ADD_POST: (state, post) => {
      if (state.currentUser) {
        state.blogPosts.addPost({ ...post, authorId: state.currentUser.id });
      } else {
        state.blogPosts.addPost({ ...post, authorId: -1 });
      }
    },
    DELETE_POST: (state, postId) => {
      state.blogPosts.deletePost(postId);
    },
    ADD_COMMENT: (state, { postId, comment }) => {
      state.blogPosts.addComment(postId, comment);
    },
    ADD_USER: (state, user) => {
      state.users.addUser(user);
    },
    UPDATE_USER: (state, user) => {
      state.users.updateUser(state.currentUser.id, user);
    },
    LOGIN: (state, userObj) => {
      const user = state.users.findByUsername(userObj.username);
      if (!user) {
        console.log(
          `User with username '${userObj.username}' is not registered`
        );
        return;
      }
      if (user.password === userObj.password) {
        state.currentUser = user;
      } else {
        console.log(
          `Password for username '${userObj.username}' doesn't match!`
        );
      }
    },
    LOGOUT: (state) => {
      state.currentUser = null;
      console.log("Logged out");
    },
  },
  actions: {
    ADD_POST: (context, post) => {
      context.commit("ADD_POST", post);
    },
    DELETE_POST: (context, postId) => {
      context.commit("DELETE_POST", postId);
    },
    ADD_COMMENT: (context, options) => {
      context.commit("ADD_COMMENT", options);
    },
    ADD_USER: (context, user) => {
      context.commit("ADD_USER", user);
    },
    UPDATE_USER: (context, user) => {
      context.commit("UPDATE_USER", user);
    },
    LOGIN: (context, user) => {
      context.commit("LOGIN", user);
    },
    LOGOUT: (context) => {
      context.commit("LOGOUT");
    },
  },
  modules: {},
});
