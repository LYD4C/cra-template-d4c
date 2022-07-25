import moment from 'moment'
import { useEffect } from 'react'
import { isDesktop, jsonToQuery } from '../src/helpers/utils'
import { getMethod } from './http'
import {v4 as uuidv4} from 'uuid'

interface IData {
  deviceName: string // 设备
  osName: string // 操作系统
  browser: string // 浏览器
  region: string // 地区
}

const getOs = () => {
  const u = navigator.userAgent
  const OSArr = [
    {
      name: 'Windows',
      it: !!u.match(/compatible/i) || u.match(/Windows/i),
    },
    {
      name: 'MacOS',
      it: !!u.match(/Macintosh/i) || u.match(/MacIntel/i),
    },
    {
      name: 'Ios',
      it: !!u.match(/iphone/i) || u.match(/Ipad/i),
    },
    {
      name: 'Android',
      it: !!u.match(/android/i),
    },
    {
      name: 'Ubuntu',
      it: !!u.match(/Ubuntu/i),
    },
    {
      name: 'Linux',
      it: !!u.match(/Linux/i),
    },
  ]
  for (const item of OSArr) {
    if (item.it) {
      return item.name
    }
  }
  return 'Other'
}
const getBrowsers = () => {
  const { userAgent } = navigator
  const bwsArr = [
    {
      name: 'sgssapp',
      it: /sogousearch/i.test(userAgent),
    },
    {
      name: 'wechat',
      it: /MicroMessenger/i.test(userAgent),
    },
    {
      name: 'weibo',
      it: !!userAgent.match(/Weibo/i),
    },
    {
      name: 'uc',
      it: !!userAgent.match(/UCBrowser/i) || userAgent.indexOf(' UBrowser') > -1,
    },
    {
      name: 'sogou',
      it: userAgent.indexOf('MetaSr') > -1 || userAgent.indexOf('Sogou') > -1,
    },
    {
      name: 'xiaomi',
      it: userAgent.indexOf('MiuiBrowser') > -1,
    },
    {
      name: 'baidu',
      it: userAgent.indexOf('Baidu') > -1 || userAgent.indexOf('BIDUBrowser') > -1,
    },
    {
      name: '360',
      it: userAgent.indexOf('360EE') > -1 || userAgent.indexOf('360SE') > -1,
    },
    {
      name: '2345',
      it: userAgent.indexOf('2345Explorer') > -1,
    },
    {
      name: 'edge',
      it: userAgent.indexOf('Edge') > -1,
    },
    {
      name: 'ie11',
      it: userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1,
    },
    {
      name: 'ie',
      it: userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1,
    },
    {
      name: 'firefox',
      it: userAgent.indexOf('Firefox') > -1,
    },
    {
      name: 'safari',
      it: userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1,
    },
    {
      name: 'qqbrowser',
      it: userAgent.indexOf('MQQBrowser') > -1 && userAgent.indexOf(' QQ') === -1,
    },
    {
      name: 'qq',
      it: userAgent.indexOf('QQ') > -1,
    },
    {
      name: 'chrome',
      it: userAgent.indexOf('Chrome') > -1 || userAgent.indexOf('CriOS') > -1,
    },
    {
      name: 'opera',
      it: userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1,
    },
  ]
  for (const item of bwsArr) {
    if (item.it) {
      return item.name
    }
  }
  return 'Other'
}

const getUserAgent = (): IData => {
  return {
    deviceName: isDesktop ? 'PC' : 'H5',
    osName: getOs(),
    browser: getBrowsers(),
    region: window.navigator.language,
  }
}

export const Reporter = () => {

  const handleCookies = () => {
    try {
      if (! document.cookie.includes('uuid')) {
        const expires = new Date(
          moment(moment().add(30, 'days').format('YYYY-MM-DD')).unix() * 1000,
        ).toUTCString()
        document.cookie = `uuid=${encodeURIComponent(uuidv4().replace(/-/g, ''))}; expires=${expires};`
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    handleCookies()
    getMethod(`${location.href}report.gif?${jsonToQuery(getUserAgent())}`)
  }, [])
}
