const { assert } = require('chai')

const Timestamp2ch = require('../src/timestamp-2ch')

describe('Timestamp2ch', () => {
  it('should be handlable aborting Xmas problem', () => {
    const t = Timestamp2ch.parse('2019/12/23(月) 25:00:00')
    assert.strictEqual(t.toDayjs().date(), 24)
    assert.strictEqual(t.toDayjs().hour(), 1)
  })
})
