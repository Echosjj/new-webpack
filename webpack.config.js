/**
 * Created by sunjinjin on 2017/11/21.
 */
const webpack = require('webpack')
const path =  require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var getHtmlTemplate = function (name, title) {
    return{
        template: './src/views/'+ name + '.html',
        filename: 'view/'+ name + '.html',
        title: title,
        chunk: [name]
    }
}
var config = {
    entry: {
        app:'./src/page/index/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:  '/dist',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(less)$/,
                loader: ExtractTextPlugin.extract(['css-loader','less-loader'])
            },
            {
                test: /\.(css)$/,
                loader: ExtractTextPlugin.extract(['css-loader'])
            },
            {
               test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options:{
                   limit: 10000,
                    name: path.posix.join('./', '/img/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlTemplate('index', '登录')),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './static'),
                to: 'static',
                ignore: ['.*']
            }
        ])
    ]
}
module.exports = config;
