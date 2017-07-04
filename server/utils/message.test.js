const expect = require('expect')

const { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Dominic'
    const text = 'Test this text'
    const message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message.from).toInclude(from, text)
  })
})
