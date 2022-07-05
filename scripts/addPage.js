const fs = require('fs-extra')

/**
 * @des 复制文件到指定为止
 */
async function copyFiles(copiedPath, resultPath) {
  const args = process.argv.slice(2)
  const name = args[0]
  const url = `${resultPath}/${name}`
  fs.ensureDirSync(url)
  try {
    await fs.copySync(copiedPath, url)
    console.log('add page success!')
  } catch (err) {
    console.error(err)
  }
}

copyFiles('templates/page', 'src/pages')