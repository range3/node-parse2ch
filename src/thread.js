'use strict'

const Post = require('./post')

class Thread {
  constructor (plugin, subject, state) {
    this.plugin = plugin
    this.subject = subject
    this.state = state
  }

  async * posts () {
    for await (const post of this.plugin.posts(this.state)) {
      yield new Post(post)
    }
  }
}

module.exports = Thread
