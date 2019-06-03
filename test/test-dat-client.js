const path = require('path')
const fs = require('fs')
const { assert } = require('chai')
const urljoin = require('url-join')
const nock = require('nock')
const iconv = require('iconv-lite')

const Client = require('../src/dat/client')
const SubjectTxt = require('../src/dat/subject-txt.js')
const Dat = require('../src/dat/dat.js')
const Timestamp2ch = require('../src/timestamp-2ch')

describe('Dat', () => {
  describe('Client', () => {
    // http://sun.cha2.org/bangumi/
    const baseUrl = 'http://example.com/bangumi/'

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

    let client
    beforeEach(() => {
      client = new Client(baseUrl)
    })

    it('should have a subject.txt url', () => {
      assert.strictEqual(
        client.subjectTxtUrl.href,
        urljoin(baseUrl, 'subject.txt')
      )
    })

    describe('#datUrl', () => {
      it('should return a dat url', () => {
        assert.strictEqual(
          client.datUrl('100.dat').href,
          urljoin(baseUrl, 'dat', '100.dat')
        )
      })
    })

    describe('#fetchSubjectTxt', () => {
      it('should return subject.txt', async () => {
        const res = await client.fetchSubjectTxt()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const subjectTxt = SubjectTxt.parse(res.text)
        subjectTxt.forEach(({ dat, subject }) => {
          assert.match(dat, /^\d+\.dat$/)
          assert.isOk(subject)
        })
      })
    })

    describe('#fetchDat', () => {
      it('should return Dat', async () => {
        let res = await client.fetchSubjectTxt()
        await new Promise(resolve => setTimeout(resolve, 1000))
        const subjectTxt = SubjectTxt.parse(res.text)

        res = await client.fetchDat(subjectTxt[0].dat)
        const dat = Dat.parse(res.text)
        dat.forEach(({ name, mail, timestamp, id, text }) => {
          assert.isString(name)
          assert.isString(mail)
          assert.instanceOf(timestamp, Timestamp2ch)
          assert.isString(id)
          assert.isString(text)
        })
      })
    })
  })
})
