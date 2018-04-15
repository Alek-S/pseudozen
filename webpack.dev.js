const webpack = require('webpack');

module.exports = {
	mode: 'development',

	//entry point
	entry: './src/app.js',

	// compiled output js
	output: {
		filename: 'public/assets/js/[name].js',
		chunkFilename: 'public/assets/js/[name]-[chunkhash].js',
	},


	module: {
		rules: [
			{
				test: /\.js?$/,
				// only process files in src folder
				include: /src/,
				loader: 'babel-loader'
			}
		],
	}, //end module


	plugins: [
		//remove localization from moment.js (significantly reduces vendor.js)
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	],


	devtool: 'eval-source-map'
};