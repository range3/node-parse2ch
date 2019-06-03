'use strict'

class Post {
  constructor (post) {
    this.name = post.name
    this.mail = post.mail
    this.timestamp = post.timestamp
    this.id = post.id
    this.text = post.text
    this.subject = post.subject
  }
}

module.exports = Post
