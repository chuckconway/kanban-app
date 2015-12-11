var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const PATHS = {
  app:path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

var common = {
  entry:PATHS.app,
    resolve:{
        extensions:['','.js','.jsx']
    },
    module:{
        loaders:[
            {test:/\.css$/, loaders:['style', 'css'], include:PATHS.app},
            {test:/\.jsx?$/, loaders:['babel'], include:PATHS.app}
        ]
    },
    plugins:[
        //important! move HotModuleReplacementPlugin below
        //new webpack.HotModuleReplacementPlugin(),
        new HtmlwebpackPlugin({
            title:'Kanban app'
        })
    ]
};

if(TARGET === 'start' || !TARGET){
    module.exports = merge(common, {
            devtool:'eval-source-map',
            devServer:{
                historyApiFallback:true,
                hot:true,
                inline:true,
                progress:true,
                stats:'display-error-details',
                host:process.env.HOST,
                port:process.env.PORT
            },
            plugins:[
                new webpack.HotModuleReplacementPlugin()
            ]
        }
    )
}

//module.exports = {
//    entry:PATHS.app,
//    output:{
//        path:PATHS.build,
//        filename:'bundle.js'
//    },
//    module:{
//        loaders:[
//            {test:/\.css$/, loaders:['style', 'css'], include:PATHS.app}
//        ]
//    },
//    devServer:{
//        historyApiFallback:true,
//        hot:true,
//        inline:true,
//        progress:true,
//        stats:'errors-only',
//        host:process.env.HOST,
//        port:process.env.PORT
//    },
//    plugins:[
//        new webpack.HotModuleReplacementPlugin(),
//        new HtmlwebpackPlugin({
//            title:'Kanban app'
//        })
//    ]
//};