'use strict';

import test from 'ava';
import EventEmitter from 'wolfy87-eventemitter';
import SwipeMenu from '../swipemenu';

test('instances', t => {
	const swipeMenu = new SwipeMenu('#menu');
	t.true(swipeMenu instanceof SwipeMenu);
	t.true(swipeMenu.ee instanceof EventEmitter);
});

test('exception', t => {
	t.throws(() => new SwipeMenu('#not'), '✖ Missing menu');
});

// Future
/*
test('touchStart', t => {
	const swipeMenu = new SwipeMenu('#menu');
	// const e = document.createEvent('TouchEvent');
	const e = document.createEvent('HTMLEvents');
	e.initEvent('touchstart', false, true);
	console.log(e);
	// const touch = document.createTouch(window, document.body, 1, 0, 0, 0, 0);
	// e.initTouchEvent('touchstart', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, null, null);
	document.body.dispatchEvent(e);
	t.true(swipeMenu.target === document.body);
});
*/
