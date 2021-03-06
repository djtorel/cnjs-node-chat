const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Dominic'
    const text = 'Test this text'
    const message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({ from, text })
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Dom'
    const lat = 15
    const lng = 19
    const url = `https://www.google.com/maps?q=${lat},${lng}`
    const message = generateLocationMessage(from, lat, lng)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({ from, url })
  })
})
