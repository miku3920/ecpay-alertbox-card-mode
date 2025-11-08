import {
  describe, test, beforeEach, afterEach, expect,
} from 'vitest'
import usePage from './composables/usePage'

const { newPage, close, getPage } = usePage()

describe('非綠界「贊助成功動畫網址」', () => {
  beforeEach(async () => {
    await newPage('data:text/html,<html><body><h1>測試頁面</h1></body></html>')
  })

  afterEach(async () => {
    await close()
  })

  test('不應該初始化卡片系統', async () => {
    const page = getPage()

    const isInitialized = await page.evaluate(() => window.ecpayCardSystemInitialized)
    expect(isInitialized).toBeUndefined()
  })
})
