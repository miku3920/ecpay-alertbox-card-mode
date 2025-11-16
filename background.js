const initCardSystem = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('scripts/init.js')

  script.onload = () => {
    script.remove()
    /* eslint-disable-next-line no-console */
    console.log(`[${new Date().toLocaleTimeString('sv')}] ✅ 卡片系統已初始化`)
  }

  document.body.appendChild(script)
}

const activateCardMode = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('scripts/apply.js')

  script.onload = () => {
    script.remove()
    /* eslint-disable-next-line no-console */
    console.log(`[${new Date().toLocaleTimeString('sv')}] ✅ 已啟動卡片模式`)
  }

  document.body.appendChild(script)
}

const restoreOriginalMode = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('scripts/restore.js')

  script.onload = () => {
    script.remove()
    /* eslint-disable-next-line no-console */
    console.log(`[${new Date().toLocaleTimeString('sv')}] 🎬 已還原動畫模式`)
  }

  document.body.appendChild(script)
}

const isAlertBoxPage = (url) => url && (
  url.startsWith('https://payment.ecpay.com.tw/Broadcaster/AlertBox/')
  || url.startsWith('https://payment-stage.ecpay.com.tw/Broadcaster/AlertBox/')
)

const updateIcon = (tabId, isActive) => {
  const [title, iconName] = [
    ['點擊切換卡片模式', 'origin'],
    ['點擊還原原始模式', 'active'],
  ][+isActive]

  chrome.action.setTitle({ tabId, title })
  chrome.action.setIcon({ tabId, path: `icons/icon-${iconName}-16.png` })
}

const getCardModeState = async (tabId) => {
  const resultTab = await chrome.storage.session.get(`cardMode_${tabId}`)

  if (resultTab[`cardMode_${tabId}`] !== undefined) {
    return resultTab[`cardMode_${tabId}`]
  }

  const resultAll = await chrome.storage.session.get('cardMode')

  if (resultAll.cardMode !== undefined) {
    return resultAll.cardMode
  }

  return true
}

const setCardModeState = async (tabId, state) => {
  await chrome.storage.session.set({ cardMode: state })
  await chrome.storage.session.set({ [`cardMode_${tabId}`]: state })
}

const toggleCardModeState = async (tabId) => {
  const state = !(await getCardModeState(tabId))
  await setCardModeState(tabId, state)
  return state
}

const removeCardModeState = async (tabId) => {
  await chrome.storage.session.remove(`cardMode_${tabId}`)
}

const showMessage = (tabId, message) => {
  chrome.action.setPopup({
    tabId,
    popup: `popup/popup.html?message=${encodeURIComponent(message)}`,
  })

  chrome.action.openPopup()

  setTimeout(() => {
    chrome.action.setPopup({ tabId, popup: '' })
  }, 2000)
}

const doAction = async (tabId, isCardMode, isInit = false) => {
  updateIcon(tabId, isCardMode)

  if (isInit) {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: initCardSystem,
    })
  }

  const actions = [
    { func: restoreOriginalMode, message: '🎬 已還原動畫模式' },
    { func: activateCardMode, message: '✅ 已啟動卡片模式' },
  ]

  const action = actions[+isCardMode]

  await chrome.scripting.executeScript({
    target: { tabId },
    func: action.func,
  })

  showMessage(tabId, action.message)
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const isAlertBox = isAlertBoxPage(tab.url)

  if (!isAlertBox) {
    return
  }

  if (changeInfo.status === 'complete') {
    const isCardMode = await getCardModeState(tabId)

    await doAction(tabId, isCardMode, true)
  }
})

chrome.action.onClicked.addListener(async (tab) => {
  const isAlertBox = isAlertBoxPage(tab.url)

  if (!isAlertBox) {
    showMessage(tab.id, '❌ 未偵測到「贊助成功動畫網址」')
    return
  }

  const isCardMode = await toggleCardModeState(tab.id)

  await doAction(tab.id, isCardMode)
})

chrome.tabs.onRemoved.addListener(async (tabId) => {
  await removeCardModeState(tabId)
})
