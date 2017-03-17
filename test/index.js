/* eslint new-cap: 0 */

'use strict'

import test from 'ava'
// import simulant from 'simulant'
import TouchEmulator from 'hammer-touchemulator'
import SwipeMenu from '../src/.'

const docFrag = document.createDocumentFragment()
const aside = document.createElement('aside')
aside.id = 'menu'
const nav = document.createElement('nav')
aside.appendChild(nav)
docFrag.appendChild(aside)
document.body.appendChild(docFrag)
TouchEmulator()

test('instances', t => {
	const swipeMenu = new SwipeMenu('#menu')
	t.true(swipeMenu instanceof SwipeMenu)
})

test('exception', t => {
	t.throws(() => new SwipeMenu('#not'), '✖ Missing aside')
})

test('touchs', t => {
	function log(ev) {
		console.log(ev.type, ev)
	}

	const events = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'click']
	for (const ev of events) {
		aside.addEventListener(ev, log, false)
		t.true(true)
	}

	// simulant.fire(aside, 'touchstart', {relatedTarget: previousNode})
	// simulant.fire(aside, 'touchstart')
	// const event = document.createEvent('TouchEvent')
	// event.initUIEvent('touchstart', true, true, window, 1)
	// event.targetTouches = [{
	// 	pageX: 0,
	// 	pageY: 0
	// }]
	// console.log(swipeMenu.startX)
	// document.body.dispatchEvent(event)
	// t.true(true)
})
