const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {

    devServer: {
         contentBase: './built'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/app/index.html",
            filename:"index.html",
            inject:true,
            minify: { //压缩HTML文件
                removeComments: false, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            favicon:"./asset/imgs/favicon.png",
            hash:true,
            chunks:['vendor','app'],
        })
    ]
 });