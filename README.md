[![test](https://github.com/miku3920/ecpay-alertbox-card-mode/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/miku3920/ecpay-alertbox-card-mode/actions/workflows/test.yml) [![users](https://img.shields.io/chrome-web-store/users/fdhonbaecpihdjohkaijjohnpbnmnnge)](https://chromewebstore.google.com/detail/fdhonbaecpihdjohkaijjohnpbnmnnge) [![version](https://img.shields.io/chrome-web-store/v/fdhonbaecpihdjohkaijjohnpbnmnnge)](https://chromewebstore.google.com/detail/fdhonbaecpihdjohkaijjohnpbnmnnge) [![license](https://img.shields.io/github/license/miku3920/ecpay-alertbox-card-mode)](https://github.com/miku3920/ecpay-alertbox-card-mode/blob/main/LICENSE)

# 綠界贊助成功動畫 ⇄ 卡片模式

Chrome 擴充功能：將綠界贊助動畫轉換為清晰易讀的卡片列表，讓實況主能方便查看所有贊助紀錄

![卡片模式示意圖](https://raw.githubusercontent.com/miku3920/ecpay-alertbox-card-mode/main/images/example.png)

## 目錄

- [簡介](#簡介)
- [安裝說明](#安裝說明)
- [使用方式](#使用方式)
- [測試功能是否正常](#測試功能是否正常)
- [常見問題](#常見問題)
- [聯絡方式](#聯絡方式)

## 簡介

這個工具能將綠界科技 ECPay 的「實況主贊助成功動畫網址」轉換成卡片列表模式，<br>
讓實況主在直播時能清楚查看所有贊助紀錄，而不是只有短暫播放的動畫

使用者可以自由切換「動畫模式」與「卡片模式」，<br>
所有功能僅作用於綠界的贊助動畫頁面（`payment.ecpay.com.tw` 與 `payment-stage.ecpay.com.tw`）

## 安裝說明

前往 Chrome 線上應用程式商店頁面安裝：

https://chromewebstore.google.com/detail/fdhonbaecpihdjohkaijjohnpbnmnnge

![商店頁面預覽](https://raw.githubusercontent.com/miku3920/ecpay-alertbox-card-mode/main/images/store.png)

## 使用方式

安裝完成後，直接開啟綠界提供的動畫網址即可自動切換為卡片模式

測試帳號範例網址：

https://payment-stage.ecpay.com.tw/Broadcaster/AlertBox/C1B8B9E32C2467466E4A8B4CE4A99378

開啟後，頁面會自動轉換為卡片列表：

![已啟動卡片模式](https://raw.githubusercontent.com/miku3920/ecpay-alertbox-card-mode/main/images/active.png)

若想切回動畫模式，可點擊擴充功能 icon：

![已還原動畫模式](https://raw.githubusercontent.com/miku3920/ecpay-alertbox-card-mode/main/images/restore.png)

💡 建議：將擴充功能「釘選」在工具列，方便快速切換模式

## 測試功能是否正常

以下範例皆使用「測試網站」與「測試帳號」：

- 特店後台登入帳號: stagetest3
- 特店後台登入密碼: test1234
- 特店統一編號: 00000000

登入測試後台：

https://vendor-stage.ecpay.com.tw/User/LogOn_Step1

![登入畫面](https://raw.githubusercontent.com/miku3920/ecpay-alertbox-card-mode/main/images/login.png)

在後台 收款工具 > 實況主收款 > 贊助成功動畫設定 下方

![設定畫面](https://raw.githubusercontent.com/miku3920/ecpay-alertbox-card-mode/main/images/setting.png)

按下「查看效果」測試功能是否正常運作

## 常見問題

**1. 這個工具會讀取或收集我的資料嗎？**

此擴充功能僅取代原本用於播放動畫的 `showAlert` 函式<br>
不會存取、收集或傳輸任何使用者的個人資料、贊助金額或訊息內容<br>
所有資料處理均在本地瀏覽器中完成

**2. 這個工具會影響其他網頁內容嗎？**

所有程式僅在綠界贊助動畫頁面（`payment.ecpay.com.tw` 和 `payment-stage.ecpay.com.tw`）執行<br>
不會影響其他網站運作

**3. 為什麼會需要暫存資料（Session Storage）？**

若頁面長時間未重新整理，授權用的 token 可能會過期<br>
導致 WebSocket 無法維持連線，贊助資料因此不再更新

此擴充功能會在無法維持連線時，自動重新整理頁面<br>
並利用暫存資料（Session Storage）傳遞給新頁面<br>
讓頁面刷新後能繼續顯示卡片

**4. 斷線期間的贊助資料會如何處理？**

斷線期間觀眾送出的贊助，綠界伺服器仍會正常入帳<br>
但由於動畫頁面當下無法接收到贊助通知<br>
頁面重新整理後，也沒辦法取得斷線期間的贊助資料<br>
因此這些贊助 **不會顯示在卡片列表中**

## 聯絡方式

若有任何問題或建議，歡迎透過以下方式回報：

- Telegram：[@miku3920](https://t.me/miku3920)
- GitHub Issues：<https://github.com/miku3920/ecpay-alertbox-card-mode/issues>
