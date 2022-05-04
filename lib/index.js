"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const autoSidebar_1 = __importDefault(require("./autoSidebar"));
module.exports = (options, ctx) => {
  let AUTO_SIDEBAR_DATA = {};
  return {
    name: "vuepress-plugin-code-copy",
    async ready() {
      AUTO_SIDEBAR_DATA = (0, autoSidebar_1.default)(options, ctx);
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
