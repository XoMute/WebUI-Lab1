import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import UserProfile from "@/views/UserProfile.vue";
import BlogPost from "@/views/BlogPost.vue";
import NewPost from "@/views/NewPost.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/posts",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/posts/:postId",
    name: "Blog Post",
    component: BlogPost
  },
  {
    path: "/create",
    name: "New Post",
    component: NewPost,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "User Profile",
    component: UserProfile,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
