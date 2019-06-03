'use strict'

const dayjs = require('dayjs')

// Dealing with "Aborting Xmas"
// e.g. 2019/12/23(wed) 34:12:34

class Timestamp2ch {
  static parse (raw) {
    const m = raw.match(/(?<year>\d{4})\/(?<mon>\d{2}\/(?<date>\d{2}))\(.+?\)\s*(?<hour>\d{2}):(?<min>\d{2}):(?<sec>\d{2})(?:\.(?<msec>\d{2}))?/)
    if (m) {
      return new Timestamp2ch({
        year: parseInt(m.groups.year, 10),
        mon: parseInt(m.groups.mon, 10),
        date: parseInt(m.groups.date, 10),
        hour: parseInt(m.groups.hour, 10),
        min: parseInt(m.groups.min, 10),
        sec: parseInt(m.groups.sec, 10),
        msec: parseInt(m.groups.msec || '0', 10) * 10,
      })
    }
  }

  constructor ({ year, mon, date, hour, min, sec, msec } = {}) {
    this.year = year || 1970
    this.mon = mon || 1
    this.date = date || 1
    this.hour = hour || 0
    this.min = min || 0
    this.sec = sec || 0
    this.msec = msec || 0
  }

  toDayjs () {
    return dayjs()
      .year(this.year)
      .month(this.mon - 1) // January as 0
      .date(this.date)
      .hour(this.hour) // can also handle > 23
      .minute(this.min)
      .second(this.sec)
      .millisecond(this.msec)
  }
}

module.exports = Timestamp2ch
