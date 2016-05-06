/* globals document */
/* eslint no-unused-vars: 0 */

'use strict';

class SwipeMenu {
	constructor(menuID, hamburguerID, obfuscatorID) {
		this.hamburguer = document.querySelector(hamburguerID);
		this.obfuscator = document.querySelector(obfuscatorID);
		this.menu = document.querySelector(menuID);
		this.width = this.menu.getBoundingClientRect().width;

		document.body.addEventListener('touchstart', this, true);
		document.body.addEventListener('touchmove', this, true);
		document.body.addEventListener('touchend', this, true);
		this.hamburguer.addEventListener('click', this, false);
		this.obfuscator.addEventListener('click', this, false);
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
			const method = translateX < this.width / 2 ? 'hamburguerHandler' : 'obfuscatorHandler';
			this.check = false;
			this.menu.style.transform = '';
			this.menu.classList.remove('menu--dragging');
			this[method]();
		}
	}

	hamburguerHandler() {
		this.menu.classList.add('menu--open');
		this.obfuscator.classList.add('is-visible');
	}

	obfuscatorHandler() {
		this.menu.classList.remove('menu--open');
		this.obfuscator.classList.remove('is-visible');
	}

	handleEvent(event) {
		switch (event.type) {
			case 'click':
				if (event.target.matches('.hamburguer')) {
					this.hamburguerHandler();
				} else {
					this.obfuscatorHandler();
				}
				break;
			case 'touchstart':
				this.ontouchstart(event);
				break;
			case 'touchmove':
				this.ontouchmove(event);
				break;
			case 'touchend':
				this.ontouchend();
				break;
			default:
				break;
		}
	}
}

function _bubblingMatchesSelector(target, selector) {
	if (!target) {
		return;
	}
	if (target.matches(selector)) {
		return target;
	}
	return _bubblingMatchesSelector(target.parentElement, selector);
}
