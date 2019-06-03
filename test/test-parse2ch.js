const fs = require('fs')
const path = require('path')
// const { assert } = require('chai')
const Parse2ch = require('../src')
const nock = require('nock')
const iconv = require('iconv-lite')

describe('Parse2ch', () => {
  const baseUrl = 'http://example.com/hogehoge/'
  const scope = nock(baseUrl).persist()

  before(() => {
    const mockSubjectTxt = iconv.encode(
      fs.readFileSync(path.join(__dirname, './mock/subject.txt')),
      'shift_jis')
    const mockDat = iconv.encode(
      fs.readFileSync(path.join(__dirname, './mock/1467974926.dat')),
      'shift_jis')

    scope
      .get('/subject.txt')
      .reply(200, mockSubjectTxt)
      .get('/dat/1467974926.dat')
      .reply(200, mockDat)
  })

  after(() => {
    scope.persist(false)
  })

  it('integration test', async () => {
    const board = Parse2ch.board(baseUrl)

    for await (const thread of board.threads()) {
      console.log(thread)
      for await (const post of thread.posts()) {
        console.log(post)
      }
      break
    }
  })
})
