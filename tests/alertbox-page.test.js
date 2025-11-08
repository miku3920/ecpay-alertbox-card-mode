import {
  describe, test, beforeEach, afterEach, expect,
} from 'vitest'
import usePage from './composables/usePage'

const {
  newPage, close, getPage, showAlert,
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

    await showAlert()

    const card = page.locator('#cardContainer > div').filter({ hasText: '測試使用者_E2E' })
    expect(await card.isVisible()).toBe(true)

    const cardContent = await card.textContent()
    expect(cardContent).toContain('測試使用者_E2E')
    expect(cardContent).toContain('12345')
    expect(cardContent).toContain('這是 E2E 測試訊息')
  })
})
