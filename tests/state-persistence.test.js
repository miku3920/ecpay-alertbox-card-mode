import {
  describe, test, beforeEach, afterEach, expect,
} from 'vitest'
import usePage from './composables/usePage'

const {
  newPage, close, reload, clickExtensionIcon, getPage,
} = usePage()

describe('狀態持久化', () => {
  beforeEach(async () => {
    await newPage(process.env.VITE_TEST_URL)
  })

  afterEach(async () => {
    await close()
  })

  test('重新整理後應該保持狀態 true', async () => {
    const page = getPage()

    const isActivatedBefore = await page.evaluate(() => window.ecpayCardModeActivated)
    expect(isActivatedBefore).toBe(true)

    await reload()

    const isActivatedAfter = await page.evaluate(() => window.ecpayCardModeActivated)
    expect(isActivatedAfter).toBe(true)
  })

  test('重新整理後應該保持狀態 false', async () => {
    const page = getPage()

    await clickExtensionIcon()

    const isActivatedBefore = await page.evaluate(() => window.ecpayCardModeActivated)
    expect(isActivatedBefore).toBe(false)

    await reload()

    const isActivatedAfter = await page.evaluate(() => window.ecpayCardModeActivated)
    expect(isActivatedAfter).toBe(false)
  })
})
