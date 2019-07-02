import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import {terser} from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
	// CommonJS
	{
		input: 'src/index.js',
		output: {file: 'lib/puremvc.js', format: 'cjs', indent: false},
		external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
		plugins: [babel()]
	},

	// ES
	{
		input: 'src/index.js',
		output: {file: 'es/puremvc.js', format: 'es', indent: false},
		external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
		plugins: [babel()]
	},

	// ES for Browsers
	{
		input: 'src/index.js',
		output: {file: 'es/puremvc.mjs', format: 'es', indent: false},
		plugins: [
			resolve(),
			replace({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			terser({
				compress: {
					pure_getters: true,
					unsafe: true,
					unsafe_comps: true,
					warnings: false
				}
			})
		]
	},

	// UMD Development
	{
		input: 'src/index.js',
		output: {
			file: 'dist/puremvc.js',
			format: 'umd',
			name: 'puremvc',
			indent: false
		},
		plugins: [
			resolve(),
			babel({
				exclude: 'node_modules/**'
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify('development')
			})
		]
	},

	// UMD Production
	{
		input: 'src/index.js',
		output: {
			file: 'dist/puremvc.min.js',
			format: 'umd',
			name: 'puremvc',
			indent: false
		},
		plugins: [
			resolve(),
			babel({
				exclude: 'node_modules/**'
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			terser({
				compress: {
					pure_getters: true,
					unsafe: true,
					unsafe_comps: true,
					warnings: false
				}
			})
		]
	}
];
