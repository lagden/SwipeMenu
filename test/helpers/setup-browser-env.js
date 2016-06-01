'use strict';

const jsdom = require('jsdom');
global.document = jsdom.jsdom([
	'<nav id="menu">Apenas um show</nav>'
].join(''));
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
global.CustomEvent = global.window.CustomEvent;
global.TouchEvent = global.window.TouchEvent;
