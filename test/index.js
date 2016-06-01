/* globals simulant */
/* eslint babel/new-cap: 0 */
/* eslint no-alert: 0 */
'use strict';

import {join} from 'path';
import test from 'ava';
// import simulant from 'simulant';
import Nightmare from 'nightmare';
import SwipeMenu from '../src/swipemenu';
import {createServer} from './helpers/server';

let s;

test.before(async () => {
	s = await createServer();
});

test.after(async () => {
	s.close();
});

const swipeMenu = new SwipeMenu('#menu');

test('instances', t => {
	t.true(swipeMenu instanceof SwipeMenu);
});

test('exception', t => {
	t.throws(() => new SwipeMenu('#not'), '✖ Missing menu');
});

test('touchStart', t => {
	const event = document.createEvent('TouchEvent');
	// event.initTouchEvent('touchstart', true, true);
	event.initUIEvent('touchstart', true, true, window, 1);
	// event.targetTouches = [{
	// 	pageX: 0,
	// 	pageY: 0
	// }];
	document.body.dispatchEvent(event);
	t.true(true);
});

test.cb('apenas um show', t => {
	t.plan(1);
	Nightmare()
		.goto(s.url)
		.inject('js', join(__dirname, '../node_modules/simulant/dist/simulant.umd.js'))
		.inject('js', join(__dirname, '../dist/swipemenu.js'))
		.evaluate(() => {
			let called = false;
			let hasTouches = false;
			document.body.addEventListener('touchstart', event => {
				called = true;
				hasTouches = event.touches.length > 0;
			});

			simulant.fire(document.body, 'touchstart', {
				touches: [
					new Touch({
						identifier: 0,
						target: document.body
					})
				]
			});

			return [called, hasTouches];
		})
		.end()
		.then(result => {
			console.log(result);
			t.is('menu', 'menu');
			t.end();
		});
});
