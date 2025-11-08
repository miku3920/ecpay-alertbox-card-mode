(() => {
  if (window.ecpayCardSystemInitialized) {
    return
  }

  window.ecpayCardSystemInitialized = true
  window.ecpayCardModeActivated = false

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

  if (window.showAlert) {
    window.originalShowAlert = window.showAlert
  }

  const alertMsg = (window.settings && window.settings.MsgTemplate) || '{name} 贊助 {amount} 元'

  window.showAlert = (data) => {
    if (!window.ecpayCardModeActivated) {
      if (window.originalShowAlert) {
        window.originalShowAlert(data)
      }
    }

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
            textContent: (new Date()).toLocaleTimeString('sv'),
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
})()
