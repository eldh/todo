const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
	entry:  [
		'webpack-hot-middleware/client',
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
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint',
			}
		],
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel?optional[]=runtime&stage=0'
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
			},
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: false,  // <-------- DISABLE redux-devtools HERE
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
