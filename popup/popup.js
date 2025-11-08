const params = new URLSearchParams(window.location.search)
const message = params.get('message')

if (message) {
  document.getElementById('message').textContent = message
}

setTimeout(() => {
  window.close()
}, 2000)
