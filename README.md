# 仿网易云网站项目
使用开源项目[网易云API](https://github.com/Binaryify/NeteaseCloudMusicApi)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development

服务器地址在utils/http.js文件中常量HOST中配置

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 开发笔记

### 模块安装

| 命令 | 解释 |
| --- | --- |
| npm install module | 安装某个module到本地项目的node_modules，但不会把安装包的信息添加到package.json文件 |
| npm install module --save | 安装某个module到本地项目的node_modules文件夹，同时把相关模块依赖添加到package.json文件的dependencies中 |
| npm install module --save-dev | 安装某个module到本地项目的node_modules文件夹，同时把相关模块依赖添加到package.json文件的devDependencies |
| npm install module -g | 与npm install module一样，只是module的安装是全局的 |
| npm install module --save -g | 与npm install module --save一样，只是module的安装是全局的 |
| npm install module --save-dev -g | 与npm install module --save-dev一样，只是module的安装是全局的 |