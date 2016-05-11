'use strict';

import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'swipemenu.js',
	format: 'umd',
	dest: 'dist/swipemenu.js',
	moduleName: 'SwipeMenu',
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs(),
		babel()
	]
};
