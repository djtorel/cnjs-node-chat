const expect = require('expect')

const { Users } = require('./users')

describe('Users', () => {
  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node course',
    }, {
      id: '2',
      name: 'Jen',
      room: 'React course',
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node course',
    }]
  })

  it('should add new user', () => {
    const usersTestAdd = new Users()
    const user = {
      id: '123',
      name: 'Andrew',
      room: 'Office Fans',
    }
    usersTestAdd.addUser(user.id, user.name, user.room)
    expect(usersTestAdd.users).toEqual([user])
  })

  it('should remove a user', () => {
    const userId = '1'
    const removedUser = users.removeUser(userId)

    expect(removedUser.id).toBe(userId)
    expect(users.users.length).toBe(2)
  })

  it('should not remove user', () => {
    const userId = '6'
    const removedUser = users.removeUser(userId)

    expect(removedUser).toNotExist()
    expect(users.users.length).toBe(3)
  })

  it('should find user', () => {
    const userId = '2'
    const foundUser = users.getUser(userId)

    expect(foundUser.id).toEqual(userId)
  })

  it('should not find user', () => {
    const userId = '5'
    const foundUser = users.getUser(userId)

    expect(foundUser).toNotExist()
  })

  it('should return names for node course', () => {
    const userList = users.getUserList('Node course')

    expect(userList).toEqual(['Mike', 'Julie'])
  })

  it('should return names for react course', () => {
    const userList = users.getUserList('React course')

    expect(userList).toEqual(['Jen'])
  })
})
