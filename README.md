# Vuepress Plugin Easy Sidebar

![下载](https://img.shields.io/npm/dw/vuepress-plugin-easy-sidebar)
![协议](https://img.shields.io/github/license/IFreeOvO/vuepress-plugin-easy-sidebar)

## 介绍（Introduction）

> 该插件可以根据目录结构自动生成侧边栏。支持 vuepress 版本为 v1.x

例如博客目录如下时：

```md
docs
├─ server
│ |-- catalog
| | |-- catalog1
| | | |-- 文章 2.md
| | |-- 文章 1.md
| |-- docker
| |-- git
```

生成目录效果如下：

> ![图](./preview.png)

## 安装（Install）

```
npm install -D vuepress-plugin-easy-sidebar
```

## 使用（Usage）

```js
module.exports = {
  plugins: [["vuepress-plugin-easy-sidebar", {}]],
};
```

## 配置项(Options)

| 属性          | 描述                              | 类型                                                         |
| ------------- | --------------------------------- | ------------------------------------------------------------ |
| handleSidebar | 自定义侧边栏配置                  | `(filesList: Array<string>, filesTree: Sidebar) => Sidebar;` |
| ignore        | 需要忽略的 markdown               | `Array<string>`                                              |
| root          | 文档所在目录的绝对路径，默认 docs | `string`                                                     |
| collapseList  | 折叠列表，元素为侧边栏的 title    | `Array<string>`                                              |

## 相关文章

有关本插件的开发流程，我写了一篇文章，详见掘金-[使用 ts 开发 vuepress 自动生成侧边栏插件](https://juejin.cn/post/7093920481899708447)
