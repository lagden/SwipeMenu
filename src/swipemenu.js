'use strict';

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
	constructor(menu, swipePoint = 20) {
		this.menuSelector = menu;
		this.swipePoint = swipePoint;
		this.menu = document.querySelector(menu);

		if (!this.menu) {
			throw new Error('✖ Missing menu');
		}

		this.param = {
			detail: {
				method: null,
				percent: null
			}
		};
		this.ceUpdate = new CustomEvent('update', this.param);
		this.ceEnd = new CustomEvent('end', this.param);
		this.width = this.menu.getBoundingClientRect().width;

		document.body.addEventListener('touchstart', this, true);
		document.body.addEventListener('touchmove', this, true);
		document.body.addEventListener('touchend', this, true);
		document.body.addEventListener('touchcancel', this, true);
	}

	onTouchstart(event) {
		const menuIsOpen = this.menu.classList.contains('swipemenu--open');
		this.check = false;
		this.startX = event.targetTouches[0].pageX;
		this.target = menuIsOpen ? bubbling(event.target, this.menuSelector) : event.currentTarget;
	}

	ontouchmove(event) {
		if (this.startX <= this.swipePoint || this.target.id === this.menuSelector.substr(1)) {
			event.preventDefault();
			event.stopPropagation();
			this.check = true;
			if (this.menu.classList.contains('swipemenu--dragging') === false) {
				this.menu.classList.add('swipemenu--dragging');
			}
			const moveX = event.targetTouches[0].pageX;
			const position = this.target.id === this.menuSelector.substr(1) ? moveX - this.startX : moveX - this.width;
			if (position > -this.width && position <= 0) {
				this.menu.style.transform = `translateX(${position}px)`;
				this.param.detail.percent = 1 - Math.abs(position) / Math.abs(this.width);
				this.menu.dispatchEvent(this.ceUpdate);
			}
		}
	}

	onTouchend() {
		if (this.check) {
			const translateX = Number(this.menu.style.transform.replace(/[^\d]/g, ''));
			const method = translateX < this.width / 2 ? 'open' : 'close';
			this.check = false;
			this.menu.style.transform = '';
			this.menu.classList.remove('swipemenu--dragging');
			this[method]();
		}
	}

	onTouchcancel() {
		this.onTouchend();
	}

	open() {
		this.param.detail.percent = 1;
		this.param.detail.method = 'add';
		this.menu.dispatchEvent(this.ceEnd);
		this.menu.classList.add('swipemenu--open');
	}

	close() {
		this.param.detail.percent = 0;
		this.param.detail.method = 'remove';
		this.menu.dispatchEvent(this.ceEnd);
		this.menu.classList.remove('swipemenu--open');
	}

	handleEvent(event) {
		const ev = `${event.type.charAt(0).toUpperCase()}${event.type.slice(1)}`;
		if (this[`on${ev}`]) {
			this[`on${ev}`](event);
		}
	}
}

export default SwipeMenu;
