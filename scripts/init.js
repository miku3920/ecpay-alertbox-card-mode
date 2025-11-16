(() => {
  if (window.ecpayCardSystemInitialized) {
    return
  }

  window.ecpayCardSystemInitialized = true
  window.ecpayCardModeActivated = false

  const alertMsg = (window.settings && window.settings.MsgTemplate) || '{name} 贊助 {amount} 元'

  const donateHistory = []
  const STORAGE_KEY = 'donateHistory'

  const wait = (ms = 100) => new Promise((resolve) => { setTimeout(resolve, ms) })

  const createElement = (tag, props = {}, ...children) => {
    const el = document.createElement(tag)
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        Object.assign(el.style, value)
      } else {
        el[key] = value
      }
    })
    children.forEach((child) => el.appendChild(child))
    return el
  }

  const initCardContainer = () => {
    document.body.appendChild(createElement('div', {
      id: 'cardContainer',
      style: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: 'Open Sans',
        zIndex: '99999',
        display: 'none',
      },
    }))
  }

  const appendCard = (data) => {
    document.getElementById('cardContainer').prepend(
      createElement(
        'div',
        {
          style: {
            border: '2px solid #32C3A6',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            fontSize: '20px',
          },
        },
        createElement(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          },
          createElement('div', {
            style: {
              fontWeight: '800',
              color: '#32C3A6',
            },
            textContent: alertMsg
              .replace('{name}', data.name || '(NULL)')
              .replace('{amount}', data.amount || '(NULL)'),
          }),
          createElement('div', {
            style: {
              fontSize: '14px',
              color: '#999',
            },
            textContent: data.timestamp || (new Date()).toLocaleTimeString('sv'),
          }),
        ),
        createElement('div', {
          style: {
            marginTop: '6px',
            color: '#555',
          },
          textContent: data.msg || '',
        }),
      ),
    )
  }

  const getStorage = (key) => {
    try {
      return JSON.parse(window.sessionStorage.getItem(key))
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(`[${new Date().toLocaleTimeString('sv')}] ❌ 讀取資料失敗`, error)
      return null
    }
  }

  const setStorage = (key, data) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(`[${new Date().toLocaleTimeString('sv')}] ❌ 儲存資料失敗`, error)
    }
  }

  const delStorage = (key) => {
    try {
      window.sessionStorage.removeItem(key)
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(`[${new Date().toLocaleTimeString('sv')}] ❌ 刪除資料失敗`, error)
    }
  }

  const appendDonateHistory = (data) => {
    donateHistory.push({
      name: data.name,
      amount: data.amount,
      msg: data.msg,
      timestamp: (new Date()).toLocaleTimeString('sv'),
    })

    if (donateHistory.length > 100) {
      donateHistory.shift()
    }
  }

  initCardContainer()

  const loadedHistory = getStorage(STORAGE_KEY)
  if (Array.isArray(loadedHistory)) {
    loadedHistory.forEach(appendCard)
    donateHistory.push(...loadedHistory)
  }
  delStorage(STORAGE_KEY)

  if (window.showAlert) {
    window.originalShowAlert = window.showAlert

    window.showAlert = (data) => {
      if (!window.ecpayCardModeActivated) {
        window.originalShowAlert(data)
      }
      appendCard(data)
      appendDonateHistory(data)
    }
  }

  if (window.connection) {
    window.connection.onreconnecting(() => {
      /* eslint-disable-next-line no-console */
      console.log(`[${new Date().toLocaleTimeString('sv')}] ⚠️ 連線中斷，正在嘗試重新連線...`)
    })

    window.connection.onreconnected(() => {
      /* eslint-disable-next-line no-console */
      console.log(`[${new Date().toLocaleTimeString('sv')}] ✅ 重新連線成功`)
    })

    window.connection.onclose(async () => {
      /* eslint-disable-next-line no-console */
      console.log(`[${new Date().toLocaleTimeString('sv')}] ❌ 連線已完全中斷，正在重新整理頁面...`)
      setStorage(STORAGE_KEY, donateHistory)
      await wait()
      window.location.reload()
    })
  }
})()
