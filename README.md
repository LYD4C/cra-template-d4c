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
F2ELint:https://www.npmjs.com/package/f2elint

### 安装
`npm install f2elint -g`

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

