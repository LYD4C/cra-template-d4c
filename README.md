# cra-tempalte-D4C
TypeScript React App Tempalte
基于CRA的app模板


## Installation
`git clone https://github.com/LYD4C/cra-template-d4c.git`

`yarn install`

`yarn dev`

## Eslint test
`yarn run test`

`yarn run test --fix`

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

