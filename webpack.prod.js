const webpack = require('webpack');

module.exports = {
	mode: 'production',

	//entry point
	entry: './src/app.js',

	// compiled output js
	// output: {
	// 	filename: './dist/assets/js/poop.js',
	// 	// chunkFilename: './public/assets/js/[name]-[chunkhash].js',
	// },


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


		// break out vendor (react, react-dom, axios..) into own bundle
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	minChunks: ({ resource }) => /node_modules/.test(resource),
		// })
		
		
	],
};