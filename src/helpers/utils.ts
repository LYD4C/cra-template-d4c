let isDesktop = false
if (typeof document !== 'undefined') {
  if (window.innerWidth >= 992) {
    isDesktop = true
  }
}

const shortenAddress = (address: string, front = 6, behind = 4): string => {
  return `${address.substring(0, front)}...${address.substring(address.length - behind)}`
}

const chunk = (arr: any[], num: number) => {
  const spliceArr = arr.slice(0)
  return Array.from({ length: Math.ceil(arr.length / num) }, () => {
    return spliceArr.splice(0, num)
  })
}

export { isDesktop, shortenAddress, chunk }
