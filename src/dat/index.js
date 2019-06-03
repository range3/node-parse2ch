'use strict'

const Client = require('./client')
const SubjectTxt = require('./subject-txt')
const Dat = require('./dat')

class DatPlugin {
  // test this plugin can parse the url
  static testUrl (url) {
    return true // default plugin always return true
  }

  constructor (url) {
    this.client = new Client(url)
  }

  async * threads () {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const res = await this.client.fetchSubjectTxt()
    const subjectTxt = SubjectTxt.parse(res.text)
    yield * subjectTxt.map(({ dat, subject }) => ({
      subject,
      state: dat,
    }))
  }

  async * posts (state) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const res = await this.client.fetchDat(state)
    const dat = Dat.parse(res.text)
    yield * dat
  }
}

module.exports = DatPlugin
