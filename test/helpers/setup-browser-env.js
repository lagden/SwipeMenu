'use strict';

global.document = require('jsdom').jsdom('<nav id="menu">Apenas um show</nav>');
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
