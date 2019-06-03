'use strict'

const Thread = require('./thread')

class Board {
  constructor (plugin) {
    this.plugin = plugin
  }

  async * threads () {
    for await (const thread of this.plugin.threads()) {
      yield new Thread(this.plugin, thread.subject, thread.state)
    }
  }
}

module.exports = Board
