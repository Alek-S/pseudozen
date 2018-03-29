const webpack = require('webpack');

module.exports = {

	//entry point
	entry: './src/app.js',

	// compiled output js
	output: {
		filename: 'public/assets/js/[name].js',
		chunkFilename: 'public/assets/js/[name]-[chunkhash].js',
	},


	module: {

		loaders: [
			{
				test: /\.jsx?$/,
				// only process files in src folder
				include: /src/,
				loader: 'babel-loader',
				query: {
					// transformations
					presets: ['react', 'es2015']
				}
			}
		],
	}, //end module


	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),

		//remove localization from moment.js (significantly reduces vendor.js)
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

		//JS minification
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: {
				unused: true,
				dead_code: true,
				drop_console: true,
				warnings: false
			}
		}),


		// break out vendor (react, react-dom, axios..) into own bundle
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({ resource }) => /node_modules/.test(resource),
		})
		
		
	], //end plugin


	// devtool: 'eval-source-map'
};