import { chromium } from 'playwright'

const pathToExtension = process.cwd()

const usePage = () => {
  let context = null
  let page = null

  const wait = (timeout = 100) => {
    const [worker] = context.serviceWorkers()
    if (!worker) {
      throw new Error('Service worker 尚未載入')
    }

    return worker.evaluate(
      (delay) => new Promise((resolve) => {
        setTimeout(resolve, delay)
      }),
      timeout,
    )
  }

  const goto = async (url) => {
    if (!page) {
      throw new Error('Page 尚未初始化，請先呼叫 newPage()')
    }

    await page.goto(url, { waitUntil: 'networkidle' })
    await wait()
  }

  const newPage = async (url) => {
    context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    })

    page = await context.newPage()

    if (url) {
      await goto(url)
    }

    return page
  }

  const close = async () => {
    if (context) {
      await context.close()
      context = null
      page = null
    }
  }

  const reload = async () => {
    if (!page) {
      throw new Error('Page 尚未初始化，請先呼叫 newPage()')
    }

    await page.reload({ waitUntil: 'networkidle' })
    await wait()
  }

  const clickIcon = async () => {
    if (!context) {
      throw new Error('Context 尚未初始化，請先呼叫 newPage()')
    }

    const [worker] = context.serviceWorkers()
    if (!worker) {
      throw new Error('Service worker 尚未載入')
    }

    await worker.evaluate(
      () => chrome.tabs.query({ active: true, currentWindow: true })
        .then((tabs) => chrome.action.onClicked.dispatch(tabs[0])),
    )
    await wait()
  }

  const showAlert = async (data) => {
    if (!page) {
      throw new Error('Page 尚未初始化，請先呼叫 newPage()')
    }

    await page.evaluate((alertData) => {
      window.showAlert(alertData)
    }, data)
    await wait()
  }

  const getPage = () => page
  const getContext = () => context

  return {
    wait,
    goto,
    newPage,
    close,
    reload,
    clickIcon,
    showAlert,
    getPage,
    getContext,
  }
}

export default usePage
