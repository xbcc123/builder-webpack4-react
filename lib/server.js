"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
var portfinder_1 = __importDefault(require("portfinder"));
var config_1 = __importDefault(require("./config"));
var util_1 = require("./util");
var builderOptions = config_1.default.getBuildConfig();
var app = express_1.default();
exports.default = (function (devConfig) {
    // 添加webpack hmr入口，这要求项目中也要安装webpack-hot-middleware，否则webpack找不到该模块
    // TODO: 这里其实可以添加resolve解决
    for (var key in devConfig.entry) {
        if (builderOptions.hot) {
            devConfig.entry[key] = [
                "webpack-hot-middleware/client?dynamicPublicPath=true&path=__webpack_hmr",
                devConfig.entry[key]
            ];
        }
        else {
            devConfig.entry[key] = [
                devConfig.entry[key]
            ];
        }
        // 如果是react-hot-loader 3.0，这一行可以注释
        // devConfig.entry[key].unshift("react-hot-loader/patch");
    }
    var compiler = webpack_1.default(devConfig);
    // 配置devServer
    app.use(webpack_dev_middleware_1.default(compiler, {
        // publicPath: devConfig.output.publicPath, // 默认就会使用devConfig的publicPath
        hot: true,
        color: true,
        stats: "errors-only" // 为了减少webpack不必要的输出，将stats设为errors-only
    }));
    // 加入热更新中间件
    app.use(webpack_hot_middleware_1.default(compiler));
    // Serve the files on port.
    portfinder_1.default.basePort = devConfig.devServer.port;
    portfinder_1.default.getPortPromise()
        .then(function (newPort) {
        if (devConfig.devServer.port !== newPort) {
            console.log(devConfig.devServer.port + "\u7AEF\u53E3\u88AB\u5360\u7528\uFF0C\u5F00\u542F\u65B0\u7AEF\u53E3" + newPort);
        }
        app.listen(newPort, function (_, err) {
            if (err) {
                console.error(err);
                util_1.postMessage.error(util_1.BuilderType.dev, { err: err });
            }
            else {
                util_1.postMessage.success(util_1.BuilderType.dev, { port: newPort });
                console.log("Webpack server listening on port " + newPort + "\n" +
                    ("Open http://127.0.0.1:" + newPort + " to checkout"));
            }
        });
    });
});
