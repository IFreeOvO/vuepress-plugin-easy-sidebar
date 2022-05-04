export interface PluginOptions {
  handleSidebar?: (filesList: Array<string>, filesTree: Sidebar) => Sidebar; // 排序
  ignore?: Array<string>; // 需要忽略的md
  root?: string; //文档所在目录的绝对路径默认docs
  collapseList?: Array<string>; // 折叠列表，元素为目录title
}

export interface SidebarItem {
  title: string;
  path: string;
  collapsable: boolean;
  sidebarDepth?: number; // 侧边栏深度，默认是1
  children: Array<SidebarItem>;
}

export interface Sidebar {
  [key: string]: Array<SidebarItem>;
}

export interface CreateNodeParams {
  children: Array<SidebarItem>;
  pathArr: Array<string>;
  resolvePath: string;
  fileName: string;
  options: PluginOptions;
}
