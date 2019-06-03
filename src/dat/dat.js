'use strict'

const decode = require('unescape')
const Timestamp2ch = require('../timestamp-2ch')

class Dat {
  static parse (raw) {
    return raw.trim().split(/\r?\n/).reduce((acc, line) => {
      const x = line.split('<>')
      if (x.length >= 5) {
        const m = x[2].match(/(.+)\s+ID:(.+)/)

        if (m) {
          acc.push({
            name: decode(x[0]),
            mail: decode(x[1]),
            timestamp: Timestamp2ch.parse(m[1]),
            id: m[2],
            text: decode(x[3]),
            subject: decode(x[4]),
          })
        }
      }

      return acc
    }, [])
  }
}

module.exports = Dat
