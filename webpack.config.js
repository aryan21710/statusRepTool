const path=require('path')
const ExtractTextPlugin=require('extract-text-webpack-plugin');

module.exports =(env)=>{
	const isProduction = env == 'production';
	const CSSExtract = new ExtractTextPlugin('styles.css');
	return {
		entry: path.join(__dirname, 'src', 'app.js'),
		devServer: {
			publicPath: path.join(__dirname, 'public'),
			contentBase: path.join(__dirname, 'public'),
			hot: true,
			historyApiFallback: true,
		},
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js',
		},
		module: {
			rules: [
				{
					loader: 'babel-loader',
					test: /\.js$/,
					exclude: /node_modules/,
				},
				{
					test: /\.s?css$/,
					use: CSSExtract.extract({
						use: ['css-loader', 'sass-loader'],
					}),
				},
				{
					test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|jpg)(\?[a-z0-9=.]+)?$/,
					loader: 'url-loader',
				},
			],
		},
		plugins: [CSSExtract],
		devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
	};
} 