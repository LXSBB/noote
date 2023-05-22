import * as fs from 'fs'

interface folder {
  type: string
  name: string
  children: object[]
  path: string
}

interface file {
  type: string
  name: string
  path: string
}

/**
 * @method
 * @desc 读取文件夹下所有内容
 */
// 获取文件夹下所有文件
export function getFilesAndFoldersInDir(path): object[] {
  const items = fs.readdirSync(path)
  const result: any[] = []
  items.forEach((item) => {
    const itemPath = `${path}/${item}`
    const stat = fs.statSync(itemPath)
    if (stat.isDirectory()) {
      // 文件夹
      const data: folder = {
        type: 'folder',
        name: item,
        children: [],
        path
      }
      // const children = getFilesAndFoldersInDir(itemPath)
      // if (children && children.length) {
      //   data.children = children
      // }
      result.push(data)
    } else {
      const fileData: file = {
        type: 'file',
        name: item,
        path
      }
      // 文件
      result.push(fileData)
    }
  })
  return result
}
