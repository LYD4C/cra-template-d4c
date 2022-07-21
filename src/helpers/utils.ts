import VConsole from 'vconsole'
// 用于H5 端调试
// e.g. vConsole.log.log(xxx)
const vConsole = new VConsole()

// 获取短地址
const shortenAddress = (address: string, front = 6, behind = 4): string => {
  return `${address.substring(0, front)}...${address.substring(address.length - behind)}`
}

const chunk = (arr: any[], num: number) => {
  const spliceArr = arr.slice(0)
  return Array.from({ length: Math.ceil(arr.length / num) }, () => {
    return spliceArr.splice(0, num)
  })
}
// 10进制转换16进制
const decimalToHex = (decimal: number) => {
  return `0x${decimal.toString(16)}`
}

let isDesktop = false
if (typeof document !== 'undefined') {
  if (window.innerWidth >= 768) {
    isDesktop = true
  }
}

export { shortenAddress, chunk, decimalToHex, isDesktop, vConsole }
