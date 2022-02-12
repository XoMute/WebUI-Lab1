import BlogPost from "./BlogPost.js";

export default class PostList {
  constructor() {
    this.posts = [];
  }

  _getPostIndex(postId) {
    return this.posts.findIndex(post => post.id === postId);
  }

  findById(postId) {
    return this.posts.find(post => post.id === postId);
  }

  addPost(postObj) {
    this.posts.push(new BlogPost(postObj));
  }

  addComment(postId, comment) {
    this.posts.find((post) => post.id === postId).addComment(comment);
  }

  deletePost(postId) {
    this.posts.splice(this._getPostIndex(postId), 1);
  }
}
