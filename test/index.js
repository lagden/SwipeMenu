'use strict';

import test from 'ava';
import SwipeMenu from '../src/swipemenu';

test('instances', t => {
	const swipeMenu = new SwipeMenu('#menu');
	t.true(swipeMenu instanceof SwipeMenu);
});

test('exception', t => {
	t.throws(() => new SwipeMenu('#not'), '✖ Missing menu');
});
