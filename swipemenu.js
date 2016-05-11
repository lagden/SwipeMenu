/* globals document */

'use strict';

import EventEmitter from 'wolfy87-eventemitter';

function bubbling(target, selector) {
	if (!target) {
		return false;
	}
	if (target.matches(selector)) {
		return target;
	}
	return bubbling(target.parentElement, selector);
}

class SwipeMenu {
	constructor(menu) {
		this.menuSelector = menu;
		this.menu = document.querySelector(menu);
		if (!this.menu) {
			throw new Error('✖ Missing menu');
		}
		this.ee = new EventEmitter();
		this.width = this.menu.getBoundingClientRect().width;
		document.body.addEventListener('touchstart', this, true);
		document.body.addEventListener('touchmove', this, true);
		document.body.addEventListener('touchend', this, true);
	}

	ontouchstart(event) {
		const menuIsOpen = this.menu.classList.contains('menu--open');
		this.check = false;
		this.startX = event.targetTouches[0].pageX;
		this.target = menuIsOpen ? bubbling(event.target, this.menuSelector) : event.currentTarget;
	}

	ontouchmove(event) {
		if (this.startX <= 15 || this.target.id === this.menuSelector.substr(1)) {
			event.preventDefault();
			event.stopPropagation();
			this.check = true;
			if (this.menu.classList.contains('menu--dragging') === false) {
				this.menu.classList.add('menu--dragging');
			}
			const moveX = event.targetTouches[0].pageX;
			const position = this.target.id === 'menu' ? moveX - this.startX : moveX - this.width;
			if (position > -this.width && position <= 0) {
				this.menu.style.transform = `translateX(${position}px)`;
			}
		}
	}

	ontouchend() {
		if (this.check) {
			const translateX = Number(this.menu.style.transform.replace(/[^\d]/g, ''));
			const method = translateX < this.width / 2 ? 'open' : 'close';
			this.check = false;
			this.menu.style.transform = '';
			this.menu.classList.remove('menu--dragging');
			this[method]();
		}
	}

	open() {
		this.ee.emit('trigger', ['add']);
		this.menu.classList.add('menu--open');
	}

	close() {
		this.ee.emit('trigger', ['remove']);
		this.menu.classList.remove('menu--open');
	}

	handleEvent(event) {
		const method = `on${event.type}`;
		if (this[method]) {
			this[method](event);
		}
	}
}

export default SwipeMenu;
