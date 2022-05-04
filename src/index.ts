import { Context } from "vuepress-types";
import { PluginOptions, Sidebar } from "./types";
import getSidebar from "./autoSidebar";

module.exports = (options: PluginOptions, ctx: Context) => {
  let AUTO_SIDEBAR_DATA: Sidebar = {};

  return {
    name: "vuepress-plugin-code-copy",
    async ready() {
      AUTO_SIDEBAR_DATA = getSidebar(options, ctx);
    },

    enhanceAppFiles() {
      return {
        name: "generate-sidebar-enhance",
        content: `export default ({ siteData }) => { siteData.themeConfig.sidebar = ${JSON.stringify(
          AUTO_SIDEBAR_DATA
        )} }`,
      };
    },
  };
};
