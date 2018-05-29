const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

module.exports = {
	entry: {
		"ibge-tabela": './es6/testes/ibge-tabela/ibge-tabela.js',
		"sidra-service": './es6/testes/sidra-service/sidra-service.js'
	},
	devtool: "inline-sourcemap",
	mode: "development",
	output: {
		filename: '[name]/[name].js',
		path: path.resolve(__dirname, '_testes')
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
	plugins: [
		new CleanWebpackPlugin(['_testes']),
		new CopyWebpackPlugin([
			{ from: 'src/testes/**/*', to: './[name]/[name].[ext]', ignore: ['*.ts'] }
		], { debug: 'info' })
	]
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all'
	// 	}
	// }
};