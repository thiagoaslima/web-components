const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

console.log("BUILD");
let debug = process.env.NODE_ENV !== "production";

module.exports = {
	entry: './es6/js/index.js',
	devtool: debug ? "inline-sourcemap" : null,
	mode:  debug ? "development" : "production",
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: debug ? [
		new CleanWebpackPlugin(['dist/js'])
	] : [
		new CleanWebpackPlugin(['dist/js']),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	  ],
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all'
	// 	}
	// }
};