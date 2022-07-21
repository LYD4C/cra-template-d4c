// 一般来说，Dapp很少需要跟后端交互，但也会存在向第三方供应商获取信息的时候
// 按需修改

const API_KEY = ''
export const getMethod = (url: string): Promise<any> => {
  return new Promise((resolve, rejects) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(err => rejects(err))
  })
}
