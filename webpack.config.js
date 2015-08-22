const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
	entry:  [
		'webpack-dev-server/client?http://localhost:8080/',
		'webpack/hot/only-dev-server',
		'./client'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
		},
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.jsx']
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'eslint',
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel'
			},
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.svg$/, loader: 'raw!svgo' },
			{ test: /\.scss$/, loaders: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				'sass-loader'
			]},
		]
	},
	postcss: function() {
		return [autoprefixer]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				DEV: JSON.stringify(true)
			}
		})
	],
	devtool: 'eval',
	devServer: {
		hot: true,
		stats: {
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false,
		}
	}
}
