import webpack from 'webpack'
import Builder from './builder'
import Config from './config'
import Server from './server'
import { postMessage, BuilderType } from './util'
export interface BaseConfig {
    [propName: string]: any
}
const builderOptions = Config.getBuildConfig()
let devConfig: BaseConfig = Builder.createDevConfig(builderOptions)
let prodConfig: BaseConfig = Builder.createProdConfig(builderOptions)

function builderWebpack4(cmd: string) {
    // 开发环境
    if (cmd === 'dev') {
        builderOptions.currentEnv = 'dev'
        devConfig = Builder.createDevConfig(builderOptions)
        Server(devConfig)
    }

    // 开发测试环境
    if (cmd === 'test') {
        builderOptions.currentEnv = 'test'
        devConfig = Builder.createProdConfig(builderOptions)
        build()
    }

    // 正式测试环境
    if (cmd === 'formalTest') {
        builderOptions.currentEnv = 'formalTest'
        devConfig = Builder.createProdConfig(builderOptions)
        build()
    }

    // 演示环境
    if (cmd === 'demo') {
        builderOptions.currentEnv = 'demo'
        devConfig = Builder.createProdConfig(builderOptions)
        build()
    }

    // 生产环境
    if (cmd === 'build') {
        builderOptions.currentEnv = 'prod'
        devConfig = Builder.createProdConfig(builderOptions)
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

export default builderWebpack4
exports.default.devConfig = devConfig
exports.default.prodConfig = prodConfig
module.exports = exports.default
