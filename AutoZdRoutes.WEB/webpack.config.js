var webpack = require('webpack');
let path = require('path');
const bundleFolder = "./wwwroot/bundle";
//-------------------------------------------------------------------------------------------------------------------------
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// Плагин для очистки выходной папки (bundle) перед созданием новой
const EncodingPlugin = require('webpack-encoding-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');// инфа о неиспользуемых файлах в проекте
const { DuplicatesPlugin } = require('inspectpack/plugin');//вдруг в проекте разные версии одной и той же библиотек,при появлении копий пакетов будет выскакивать предупреждение
//-------------------------------------------------------------------------------------------------------------------------
let conf = {
    mode: 'development',
    entry: {
        app: "./wwwroot/ts/src/app.tsx",
        signalRInitialize: "./wwwroot/ts/signalRInitialize.ts",
        nonAuthorize: "./wwwroot/ts/nonAuthorize.ts",
        test: "./wwwroot/ts/_not_use/test.ts"
    },
    output: {
        path: path.resolve(__dirname,bundleFolder),
        filename: "[name].js",
        publicPath: "/wwwroot/bundle/"
    },
    module: {
        rules: [
            //{
            //    test: /\.js$/,
            //    exclude: /node_modules/,
            //    use: {
            //        loader: 'babel-loader'
            //    }               
            //},
            {                                                                              
                test: /\.s?[ac]ss$/i,      // #Solve:.ass !!!             import css модулей не работает без их определения в global.d.ts (declare module '*.css'; declare module '*.scss';)                
                use: [                                                                    
                    { loader: 'style-loader', options: { injectType: 'styleTag' } }       
                    , {
                        loader: 'css-loader', options: {
                            modules: {
                                mode: 'local',
                                //exportGlobals: true,
                                //exportOnlyLocals: false,
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        }
                    }
                    , 'sass-loader']  
            },                                                                                                     
            {
                test: /\.tsx?$/,
                use: ['ts-loader','source-map-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx','.ts','.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new EncodingPlugin({
            encoding: 'utf-8' //Увы пока не работает
        }),
        //new UnusedFilesWebpackPlugin({
        //    patterns: ["wwwroot/**/*.js", "wwwroot/**/*.jsx", "wwwroot/**/*.css","wwwroot/**/*.scss"],
        //    globOptions: {
        //        ignore: ["node_modules/**/*", "wwwroot/lib/**/*"]
        //        }
        //}),
        //new DuplicatesPlugin(),
    ],
    // Включаем генерацию отладочной информации внутри выходного файла
    // (Нужно для работы отладки клиентских скриптов)
    //devtool: "eval-source-map",
    optimization: {
        mergeDuplicateChunks: true
    }
    //resolve: {
    //    alias: {
    //        'react-dom': '@hot-loader/react-dom'
    //    }
    //}
};
module.exports = conf;
//module.exports = (env, options) => {
//    let production = options.mode === 'production'
//    conf.devtool = production ?
//        'source-map'
//        : 'source-map';
//    return conf;
//};