/* globals document */
/* eslint no-unused-vars: 0 */

'use strict';

const h = document.querySelector('#hamburguerTrigger');
const menu = document.querySelector('#menu');
const obfuscator = document.querySelector('#obfuscator');

function _bubblingMatchesSelector(target, selector) {
	if (!target) {
		return;
	}
	if (target.matches(selector)) {
		return target;
	}
	return _bubblingMatchesSelector(target.parentElement, selector);
}

const handlers = {
	menuHandler() {
		menu.classList.add('menu--open');
		obfuscator.classList.add('is-visible');
	},
	obfuscatorHandler() {
		menu.classList.remove('menu--open');
		obfuscator.classList.remove('is-visible');
	}
};

h.addEventListener('click', handlers.menuHandler, false);
obfuscator.addEventListener('click', handlers.obfuscatorHandler, false);

class MenuSwipe {
	constructor(menuID) {
		this.menu = document.querySelector(menuID);
		this.width = this.menu.getBoundingClientRect().width;
		this.body = document.body;
		this.body.addEventListener('touchstart', this, true);
		this.body.addEventListener('touchmove', this, true);
		this.body.addEventListener('touchend', this, true);
	}

	ontouchstart(event) {
		this.startX = parseInt(event.targetTouches[0].pageX, 10);
		this.check = false;
	}

	ontouchmove(event) {
		const menuOpen = this.menu.classList.contains('menu--open');
		const target = menuOpen ? _bubblingMatchesSelector(event.target, '.menu') : event.currentTarget;
		if (this.startX <= 15 || target.id === 'menu') {
			if (this.menu.classList.contains('menu--dragging') === false) {
				this.menu.classList.add('menu--dragging');
			}
			const moveX = parseInt(event.targetTouches[0].pageX, 10);
			const position = target.id === 'menu' ? moveX - this.startX : moveX - this.width;
			if (position > -this.width && position <= 0) {
				this.menu.style.transform = `translateX(${position}px)`;
			}
			this.check = true;
			event.preventDefault();
			event.stopPropagation();
		}
	}

	ontouchend() {
		if (this.check) {
			const translateX = Number(this.menu.style.transform.replace(/[^\d]/g, ''));
			const key = translateX < this.width / 2 ? 'menuHandler' : 'obfuscatorHandler';
			this.check = false;
			this.menu.style.transform = '';
			this.menu.classList.remove('menu--dragging');
			handlers[key]();
		}
	}

	handleEvent(event) {
		const m = `on${event.type}`;
		if (this[m]) {
			this[m](event);
		}
	}
}
