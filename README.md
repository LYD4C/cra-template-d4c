# cra-template-D4C
TypeScript React App Template
基于CRA的app模板


## Installation
`git clone https://github.com/LYD4C/cra-template-d4c.git`

or

in folder

`npx create-react-app PROJECT NAME --template d4c`

`yarn install`

`yarn dev`

## Eslint 

Eslint 使用 ali F2ELint脚手架进行搭建
包含 eslint、prettier、vscode项目级setting配置以及git commit 钩子配置等。
F2ELint文档 `https://www.npmjs.com/package/f2elint`

### 安装
`yarn global add f2elint`

### `f2elint scan`：一键扫描
### `f2elint fix`：一键修复



## To create a production build

`yarn build`

## 添加页面
NAME 是需要添加的页面名称

`yarn run addPage NAME`

## 添加公共组件
NAME 是需要添加的组件名称

`yarn run addCompo NAME`


## 与环境相关的变量
/src/config/index.ts

config 目录下可以配置与运行环境相关的变量,如合约地址等

该文件夹最终导出 CONFIG Object 变量

Example:

```tsx
//src/pages/Main/Main.tsx
import CONFIG from "../../config"
console.log(CONFIG.xxx)
```

### 关于移动端适配 采用flex布局 + rem + 百分百
需按需要配置
`public/index.html`

在写样式的时候，UI稿尺寸 / 100。
Example:

```
width: 200px;

width: 2rem;

```


## 关于ui库
本项目使用 `Material UI`,在 pc与移动端上都有较好的适配，并且可定制化高，便于样式的客制
`https://mui.com/zh/material-ui/getting-started/overview/`

## 关于样式
公共组件目录 /components
当中的组件会根据每个项目不同的基准进行调整，具有一定规范性。

本项目模版使用styled-components 进行样式的编写，
配合Material UI `https://mui.com/zh/material-ui/getting-started/overview/` 进行样式的自定义
在进行样式相关编码时，应避免使用内联样式的形式进行编码（`style`）



## 接口与请求
通过`src/http.ts`中的方法进行api请求
接口可以放置在 `src/service.ts`接口文件
或者接口功能业务单一，可存放于所用到的页面目录下

## 工程化相关

本项目使用CRA脚手架进行搭建
且已使用craco库提供了工程相关的配置的可定制化。
craco `https://www.npmjs.com/package/@craco/craco`
可在 `craco.config.js`文件中进行配置的定制

## 路由
使用 react-router-dom 6.x.x  `https://reactrouter.com/docs/en/v6/getting-started/overview`