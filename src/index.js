'use strict'

const DatPlugin = require('./dat')
const Board = require('./board')

class Parse2ch {
  static use (Plugin) {
    this.Plugins = this.Plugins || []
    this.Plugins.unshift(Plugin)
  }

  static board (url) {
    const Plugin = this.Plugins.find(Plugin => {
      return Plugin.testUrl(url)
    })

    return new Board(new Plugin(url))
  }
}

Parse2ch.use(DatPlugin)

module.exports = Parse2ch
