"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const merge_1 = __importDefault(require("merge"));
const IGNORE_FILES = [
    ".vuepresss",
    "**/README.md",
    "**/index.md",
]; // README.md和index.md不算入侧边栏
function getNodeIndex(treeNodes, title) {
    return treeNodes.findIndex((childNode) => childNode.title === title);
}
function isCollapsed(collapseList, title) {
    if (collapseList.length === 0) {
        return true;
    }
    return collapseList.includes(title);
}
/**
 *
 * @param children 子节点
 * @param pathArr 被拆解的路径，例如文件路径'/web/js/es6/demo.md'，则pathArr为['js','es6']即路径中间的文件
 * @param resolvePath 已解析的路径，每递归一次，路径加一层，例如文件路径'/web/js/es6/demo.md'，第一次遍历结果'/web/js/', 第一次遍历结果'/web/js/es6/'
 * @param fileName 当前markdown名称
 * @returns
 */
function findAndCreateNode(params) {
    let { children, pathArr, resolvePath, fileName, options } = params;
    const collapseList = options.collapseList || [];
    if (pathArr.length === 0) {
        // 遍历到叶子节点时，path一定有值，children一定为空数组
        children.push({
            title: fileName,
            path: `${resolvePath}/${fileName}`,
            children: [],
            collapsable: isCollapsed(collapseList, fileName),
        });
    }
    else {
        const dirName = pathArr.splice(0, 1)[0];
        const childNodeIndex = getNodeIndex(children, dirName);
        const currentResolvePath = `${resolvePath}/${dirName}`;
        if (childNodeIndex === -1) {
            // 如果没有title为dirName的节点则创建
            children.push({
                title: dirName,
                path: "",
                children: [],
                collapsable: isCollapsed(collapseList, dirName),
            });
            // 遍历子节点
            const lastNodeIndex = children.length - 1;
            const dirNode = children[lastNodeIndex];
            findAndCreateNode({
                children: dirNode.children,
                pathArr,
                resolvePath: currentResolvePath,
                fileName,
                options,
            });
        }
        else {
            // 遍历子节点
            const dirNode = children[childNodeIndex];
            findAndCreateNode({
                children: dirNode.children,
                pathArr,
                resolvePath: currentResolvePath,
                fileName,
                options,
            });
        }
    }
}
/**
 * 将路径列表转成树
 * 例如['web/js/demo.md']，转成{
 *  '/web/': [
 *    {
 *      title: 'js',
 *      path: ''
 *      children: [
 *        {
 *          title: 'demo',
 *          path: '/web/js/demo',
 *          children: []
 *        }
 *      ]
 *    }
 *  ]
 * }
 * @param list
 * @returns
 */
function listToTree(options, list) {
    let tree = {};
    for (let i = 0; i < list.length; i++) {
        const markdownPath = list[i];
        // 将路径拆分。例如'web/js/es6/demo.md'拆成web,['js','es6'],demo.md
        const pathArr = markdownPath.split("/");
        const category = pathArr.splice(0, 1)[0];
        const fileName = pathArr
            .splice(pathArr.length - 1, 1)[0]
            .replace(".md", "");
        const categoryKey = `/${category}/`;
        if (!(categoryKey in tree)) {
            tree[categoryKey] = [];
        }
        findAndCreateNode({
            children: tree[categoryKey],
            pathArr,
            resolvePath: `/${category}`,
            fileName,
            options,
        });
    }
    return tree;
}
function getSidebar(options, ctx) {
    const defaultOptions = {
        ignore: [],
        root: ctx.options.sourceDir,
        collapseList: []
    };
    const pluginOptions = merge_1.default.recursive(defaultOptions, options);
    let sidebar = {};
    const ignore = options.ignore || [];
    const filesList = glob_1.default.sync("**/*.md", {
        cwd: pluginOptions.root,
        ignore: [...IGNORE_FILES, ...ignore],
    });
    sidebar = listToTree(pluginOptions, filesList);
    if (pluginOptions.handleSidebar) {
        sidebar = pluginOptions.handleSidebar(filesList, sidebar);
    }
    return sidebar;
}
exports.default = getSidebar;
