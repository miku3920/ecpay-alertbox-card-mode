(() => {
  window.ecpayCardModeActivated = true

  const cardContainer = document.getElementById('cardContainer')

  if (cardContainer) {
    cardContainer.style.display = ''
  }
})()
