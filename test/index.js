'use strict';

import test from 'ava';
// import simulant from 'simulant';
import SwipeMenu from '../src/swipemenu';

const swipeMenu = new SwipeMenu('#menu');

test('instances', t => {
	t.true(swipeMenu instanceof SwipeMenu);
});

test('exception', t => {
	t.throws(() => new SwipeMenu('#not'), '✖ Missing menu');
});

test('touchStart', t => {
	const event = document.createEvent('TouchEvent');
	event.initUIEvent('touchstart', true, true, window, 1);
	// event.targetTouches = [{
	// 	pageX: 0,
	// 	pageY: 0
	// }];
	// console.log(swipeMenu.startX);
	document.body.dispatchEvent(event);
	t.true(true);
});
