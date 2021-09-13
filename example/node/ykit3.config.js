'use strict';
const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const copyData = new CopyWebpackPlugin({
    patterns: [
        {
        from: path.resolve(__dirname, './src/assets'),
        to: "assets"
        }
    ]
})
module.exports = {
    webpack (api) {
        // api.configDll(config => {
        //     config.lib = {
        //         vendors: [
        //             'react',
        //             'react-dom',
        //             'react-redux',
        //             'react-router',
        //             'react-router-dom',
        //             'react-router-redux',
        //             'redux',
        //             'redux-actions',
        //             'redux-logger',
        //             'redux-thunk'
        //         ],
        //     }
        // })
  
        api.extendConfig((config, webpack) => {
            config.entry = {
                "main": './src/pages/index.js',
            };
            config.plugins.push(copyData)
            config.plugins.push( new webpack.ProvidePlugin({
                React: "react",
            }))
           
            config.resolve.alias = {
                app: path.resolve(__dirname, './src/app'),
                assets: path.resolve(__dirname, './src/assets') ,
                components: path.resolve(__dirname, './src/components'),
                pages: path.resolve(__dirname, './src/pages'),
                scss: path.resolve(__dirname, './src/scss'),
                utils: path.resolve(__dirname, './src/utils')
            }
         
        })
      
    }
}