'use strict'

const urljoin = require('url-join')
const request = require('superagent')
require('superagent-charset')(request)

class Client {
  constructor (baseUrl, options = {}) {
    this.baseUrl = new URL(baseUrl)

    this.subjectTxtUrl = new URL(urljoin(this.baseUrl.href, 'subject.txt'))
    this.baseDatUrl = new URL(urljoin(this.baseUrl.href, 'dat'))
  }

  datUrl (dat) {
    return new URL(urljoin(this.baseDatUrl.href, dat))
  }

  fetchSubjectTxt ({ charset } = { charset: 'SHIFT_JIS' }) {
    return request
      .get(this.subjectTxtUrl)
      .buffer(true)
      .charset(charset)
  }

  fetchDat (dat, { charset } = { charset: 'SHIFT_JIS' }) {
    return request
      .get(this.datUrl(dat))
      .buffer(true)
      .charset(charset)
  }
}

module.exports = Client
