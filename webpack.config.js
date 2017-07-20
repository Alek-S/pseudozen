let webpack = require('webpack');

module.exports = {

	//entry point
	entry: './app/app.js',

	// compiled output js
	output: {
		filename: 'public/assets/js/bundle.js'
	},


	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				// only process files in app folder
				include: /app/,
				loader: 'babel-loader',
				query: {
					// transformations
					presets: ['react', 'es2015']
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
		new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
		new webpack.optimize.OccurrenceOrderPlugin()

	],
	//dev only
	devtool: 'eval-source-map'
};
