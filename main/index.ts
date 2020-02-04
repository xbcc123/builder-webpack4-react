import webpack from 'webpack';
import Builder from './builder';
import Config from './config';
import Server from './server';
import { postMessage, BuilderType } from "./util";
export interface BaseConfig {
  [propName: string]: any; 
}
 
const builderOptions = Config.getBuildConfig();
const devConfig: BaseConfig = Builder.createDevConfig(builderOptions);
const testConfig: BaseConfig = Builder.createDevConfig(builderOptions)
const fomalTestConfig: BaseConfig = Builder.createDevConfig(builderOptions);
const demoConfig: BaseConfig = Builder.createDevConfig(builderOptions)
const prodConfig: BaseConfig = Builder.createProdConfig(builderOptions);

function builderWebpack4(cmd: string) {
  // 开发环境
  if (cmd === 'dev') {
    Server(devConfig);
  }  

  // 开发测试环境
  if (cmd === 'test') {
    build()
  } 

  // 正式测试环境
  if (cmd === 'formalTest') {
    build()
  }  

  // 演示环境
  if (cmd === 'demo') {
    build()
  } 

  // 生产环境
  if (cmd === 'pro') {
    build()
  }
}

function build() {
     webpack(prodConfig, (err: any, stats: any) => {
         if (err) {
             console.log(err)
             postMessage.error(BuilderType.build, err)
             process.exit(2)
         }

         postMessage.success(BuilderType.build)

         console.log(
             stats &&
                 stats.toString({
                     chunks: false,
                     colors: true,
                     children: false
                 })
         )
     }) 
}


export default builderWebpack4;
exports.default.devConfig = devConfig;
exports.default.prodConfig = prodConfig;
module.exports = exports.default;


