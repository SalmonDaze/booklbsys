const moment = require('moment')

function msToDate(ms) {
    let d = moment.duration(ms)
    return `${d.years() + 1970}-${d.months() + 1}-${d.days()}`
}

function remainTime(start, end) {
    return (start - end) / 1000 / 60 / 60 /24
}

module.exports = {
    msToDate,
    remainTime,
}