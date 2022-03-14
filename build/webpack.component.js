const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const Components = require('../components.json');

module.exports = {
    mode : 'production',
    entry: Components,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },  
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules'],
        alias: {
          '@': path.resolve(__dirname, '../')
        }
    }
}