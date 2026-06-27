/**
 * 模块声明、全局扩展、通用类型
 */


/**
 * 为 CSS Modules 提供类型支持，让你在 TypeScript 中导入 SCSS 模块时能获得类型检查和智能提示
 */
declare module "*.module.scss" {
    const classes: {readonly [key:string] : string}
    export default  classes;
}
