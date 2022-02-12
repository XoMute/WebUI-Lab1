export default class BlogPost {
  constructor(postObj) {
    this.id = Math.round(Math.random() * 1000000).toString();
    this.title = postObj.title;
    this.subtitle = postObj.subtitle;
    this.content = postObj.content;
    this.authorId = postObj.authorId;
    this.created = new Date(postObj.created);
    if (postObj.comments) {
      this.comments = postObj.comments;
    } else {
      this.comments = [];
    }
  }

  addComment(comment) {
    this.comments.push({ ...comment, id: this.comments.length + 1 });
  }
}
