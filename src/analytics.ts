import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
interface IData {
  id: string // id
  deviceName: string // 设备
  osName: string // 操作系统
  browser: string // 浏览器
  region: string // 地区
  viewTime: string // 访问时间
}
export const Reporter = () => {
  const Info = window.performance.timing
  const region = window.navigator.language

  function formatDate(timestamp: number) {
    const date = new Date(timestamp)
    const Y = `${date.getFullYear()}/`
    const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/`
    const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `
    const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`
    const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`
    const s = `${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
    return Y + M + D + h + m + s
  }
  function getDev(value: string) {
    if (value === 'Ios' || value === 'Android') return 'H5'
    return 'PC'
  }
  function getOs() {
    const u = navigator.userAgent
    if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
      return 'Windows'
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
      return 'MacOS'
    } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
      return 'Ios'
    } else if (u.match(/android/i)) {
      return 'Android'
    } else if (u.match(/Ubuntu/i)) {
      return 'Ubuntu'
    } else if (u.match(/Linux/i)) {
      return 'Linux'
    } else {
      return 'Other'
    }
  }
  function getBrowsers() {
    const { userAgent } = navigator
    const bws = [
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
    for (let i = 0; i < bws.length; i++) {
      if (bws[i].it) {
        return bws[i].name
      }
    }

    return 'Other'
  }
  function requserData(url: string, data: any) {
    navigator.sendBeacon(url, data)
  }
  useEffect(() => {
    const {
      navigator: { userAgent },
    } = window
    const userAgentObj: IData = {
      id: uuidv4(),
      deviceName: getDev(getOs()),
      osName: getOs(),
      browser: getBrowsers(),
      region,
      viewTime: formatDate(Info.connectEnd),
    }
    window.localStorage.setItem('userAgentData', JSON.stringify(userAgentObj))
    const reqData: any = window.localStorage.getItem('userAgentData')
    const requestUrl: string = ''
    requserData(requestUrl, JSON.parse(reqData))

    console.log(11111, userAgent)
    console.log('---userAgentObj---', userAgentObj)
  }, [])
}
