var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry:[ 
	"script!jquery/dist/jquery.min.js",
	"script!foundation-sites/dist/foundation.min.js",
	"./app/index.jsx"
	],

	
	externals: {
		jquery: "jQuery"
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
	
	output: {path: __dirname, filename: './public/bundle.js'},
	module: {
				loaders: [
					{
						test: /\.jsx?$/,
						loader: 'babel-loader',
						exclude: /(node_modules|bower_components)/,
						query: {presets: ['es2015', 'react', 'stage-0']}	
					},
					//{ test: /\.css$/, loader: "style!css" },
					//{loader: 'script-loader'}
				]
			},
			resolve: {
				root: __dirname,
			alias: {
					Main: 'app/components/main.jsx',
					applicationStyles: 'app/styles/app.scss'
				},
				extensions: ['', '.js', '.jsx']
			},

			sassLoader: {
				includePaths: [
					path.resolve(__dirname, './node_modules/foundation-sites/scss')
				]
			},

			devtool: 'cheap-module-eval-source-map'


}


