import {
  describe, test, beforeEach, afterEach, expect,
} from 'vitest'
import usePage from './composables/usePage'

const {
  wait, newPage, close, showAlert, getPage,
} = usePage()

describe('綠界「贊助成功動畫網址」功能', () => {
  beforeEach(async () => {
    await newPage(process.env.VITE_TEST_URL)
  })

  afterEach(async () => {
    await close()
  })

  test('應該自動初始化卡片系統', async () => {
    const page = getPage()

    const isInitialized = await page.evaluate(() => window.ecpayCardSystemInitialized)
    expect(isInitialized).toBe(true)
  })

  test('應該自動啟動卡片模式', async () => {
    const page = getPage()

    const isActivated = await page.evaluate(() => window.ecpayCardModeActivated)
    expect(isActivated).toBe(true)

    const cardContainer = page.locator('#cardContainer')
    expect(await cardContainer.isVisible()).toBe(true)
  })

  test('showAlert 應該建立卡片', async () => {
    const page = getPage()

    await showAlert({
      name: '測試使用者_E2E',
      amount: '12345',
      msg: '這是 E2E 測試訊息',
    })

    const card = page.locator('#cardContainer > div').filter({ hasText: '測試使用者_E2E' })
    expect(await card.isVisible()).toBe(true)

    const cardContent = await card.textContent()
    expect(cardContent).toContain('測試使用者_E2E')
    expect(cardContent).toContain('12345')
    expect(cardContent).toContain('這是 E2E 測試訊息')
  })

  test('斷線後應該自動重新整理並恢復卡片', async () => {
    const page = getPage()

    await showAlert({
      name: '測試使用者_E2E',
      amount: '12345',
      msg: '這是 E2E 測試訊息',
    })

    const loadPromise = new Promise((resolve) => {
      const onLoad = (state) => {
        page.off('load', onLoad)
        resolve(state)
      }
      page.on('load', () => onLoad(true))
      setTimeout(() => onLoad(false), 3000)
    })

    await page.evaluate(() => {
      const callbacks = (window.connection && window.connection.closedCallbacks) || []
      callbacks.forEach((callback) => callback())
    })

    const reloaded = await loadPromise
    await page.waitForLoadState('networkidle')
    await wait()

    expect(reloaded).toBe(true)

    const card = page.locator('#cardContainer > div').filter({ hasText: '測試使用者_E2E' })
    expect(await card.isVisible()).toBe(true)

    const cardContent = await card.textContent()
    expect(cardContent).toContain('測試使用者_E2E')
    expect(cardContent).toContain('12345')
    expect(cardContent).toContain('這是 E2E 測試訊息')
  })
})
