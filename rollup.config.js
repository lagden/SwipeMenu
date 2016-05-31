'use strict';

import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/swipemenu.js',
	format: 'umd',
	dest: 'dist/swipemenu.js',
	moduleName: 'SwipeMenu',
	plugins: [
		babel()
	]
};
