import {
  describe, test, beforeEach, afterEach, expect,
} from 'vitest'
import usePage from './composables/usePage'

const {
  newPage, close, clickIcon, getPage,
} = usePage()

describe('Icon 點擊切換', () => {
  beforeEach(async () => {
    await newPage(process.env.VITE_TEST_URL)
  })

  afterEach(async () => {
    await close()
  })

  test('點擊 icon 應該切換卡片模式', async () => {
    const page = getPage()

    const cardContainerFirst = page.locator('#cardContainer')
    expect(await cardContainerFirst.isVisible()).toBe(true)

    await clickIcon()

    const cardContainerSecond = page.locator('#cardContainer')
    expect(await cardContainerSecond.isVisible()).toBe(false)

    await clickIcon()

    const cardContainerThird = page.locator('#cardContainer')
    expect(await cardContainerThird.isVisible()).toBe(true)

    await clickIcon()

    const cardContainerFourth = page.locator('#cardContainer')
    expect(await cardContainerFourth.isVisible()).toBe(false)
  })
})
