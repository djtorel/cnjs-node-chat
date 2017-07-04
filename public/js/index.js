/* eslint-disable no-undef, func-names, prefer-arrow-callback, no-alert */
const socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const li = jQuery('<li></li>')
  li.text(`${message.from} ${formattedTime}: ${message.text}`)

  jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const li = jQuery('<li></li>')
  const a = jQuery('<a target="_blank">My Current location</a>')

  li.text(`${message.from} ${formattedTime}: `)
  a.attr('href', message.url)
  li.append(a)
  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()
  const messageTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val(),
  }, function () {
    messageTextBox.val('')
  })
})

const locationButton = jQuery('#send-location')

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.attr('disabled', 'disabled').text('Sending....')

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
    locationButton.removeAttr('disabled').text('Send location')
  }, function () {
    alert('Unable to fetch location.')
    locationButton.removeAttr('disabled').text('Send location')
  })
})
