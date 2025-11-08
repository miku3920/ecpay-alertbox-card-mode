(() => {
  window.ecpayCardModeActivated = false

  const cardContainer = document.getElementById('cardContainer')

  if (cardContainer) {
    cardContainer.style.display = 'none'
  }
})()
