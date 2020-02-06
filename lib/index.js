"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var builder_1 = __importDefault(require("./builder"));
var config_1 = __importDefault(require("./config"));
var server_1 = __importDefault(require("./server"));
var util_1 = require("./util");
var builderOptions = config_1.default.getBuildConfig();
var devConfig = builder_1.default.createDevConfig(builderOptions);
var prodConfig = builder_1.default.createProdConfig(builderOptions);
function builderWebpack4(cmd) {
    // 开发环境
    if (cmd === 'dev') {
        builderOptions.currentEnv = 'dev';
        devConfig = builder_1.default.createDevConfig(builderOptions);
        server_1.default(devConfig);
    }
    // 开发测试环境
    if (cmd === 'test') {
        builderOptions.currentEnv = 'test';
        devConfig = builder_1.default.createProdConfig(builderOptions);
        build();
    }
    // 正式测试环境
    if (cmd === 'formalTest') {
        builderOptions.currentEnv = 'formalTest';
        devConfig = builder_1.default.createProdConfig(builderOptions);
        build();
    }
    // 演示环境
    if (cmd === 'demo') {
        builderOptions.currentEnv = 'demo';
        devConfig = builder_1.default.createProdConfig(builderOptions);
        build();
    }
    // 生产环境
    if (cmd === 'build') {
        builderOptions.currentEnv = 'prod';
        devConfig = builder_1.default.createProdConfig(builderOptions);
        build();
    }
}
function build() {
    webpack_1.default(prodConfig, function (err, stats) {
        if (err) {
            console.log(err);
            util_1.postMessage.error(util_1.BuilderType.build, err);
            process.exit(2);
        }
        util_1.postMessage.success(util_1.BuilderType.build);
        console.log(stats &&
            stats.toString({
                chunks: false,
                colors: true,
                children: false
            }));
    });
}
exports.default = builderWebpack4;
exports.default.devConfig = devConfig;
exports.default.prodConfig = prodConfig;
module.exports = exports.default;
