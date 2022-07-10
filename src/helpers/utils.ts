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

const decimalToHex = (decimal: number) => {
  return `0x${decimal.toString(16)}`
}

export { shortenAddress, chunk, decimalToHex }
