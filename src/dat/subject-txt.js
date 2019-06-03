'use strict'

const decode = require('unescape')

class SubjectTxt {
  static parse (raw) {
    return raw.trim().split(/\r?\n/).reduce((acc, line) => {
      const x = line.split('<>')
      if (x.length === 2) {
        acc.push({
          dat: x[0],
          subject: decode(x[1]),
        })
      }
      return acc
    }, [])
  }
}

module.exports = SubjectTxt
