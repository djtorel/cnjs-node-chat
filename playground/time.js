const moment = require('moment')

const date = moment()
console.log(date.format('MMM Do, YYYY hh:mm:ss a'))

console.log(date.format('h:mm a'))

const b = moment(date.subtract(2, 'M'))

console.log(date.valueOf())
console.log(b.fromNow())
