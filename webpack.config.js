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
		new webpack.DefinePlugin({ //<--key to reduce React's size
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
	],
	// This lets us debug our react code in chrome dev tools. Errors will have lines and file names
	// Without this the console says all errors are coming from just coming from bundle.js
	devtool: 'eval-source-map'
};
