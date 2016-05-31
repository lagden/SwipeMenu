(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.SwipeMenu = factory());
}(this, function() {
	'use strict';

	var babelHelpers = {};

	babelHelpers.classCallCheck = function(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	};

	babelHelpers.createClass = function() {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor)
					descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function(Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	babelHelpers;

	function bubbling(target, selector) {
		if (!target) {
			return false;
		}

		if (target.matches(selector)) {
			return target;
		}
		return bubbling(target.parentElement, selector);
	}

	var SwipeMenu = function() {
		function SwipeMenu(menu) {
			babelHelpers.classCallCheck(this, SwipeMenu);

			this.menuSelector = menu;
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

		babelHelpers.createClass(SwipeMenu, [{
			key: 'onTouchstart',
			value: function onTouchstart(event) {
				var menuIsOpen = this.menu.classList.contains('swipemenu--open');
				this.check = false;
				this.startX = event.targetTouches[0].pageX;
				this.target = menuIsOpen ? bubbling(event.target, this.menuSelector) : event.currentTarget;
			}
		}, {
			key: 'onTouchmove',
			value: function onTouchmove(event) {
				if (this.startX <= 20 || this.target.id === this.menuSelector.substr(1)) {
					event.preventDefault();
					event.stopPropagation();
					this.check = true;
					if (this.menu.classList.contains('swipemenu--dragging') === false) {
						this.menu.classList.add('swipemenu--dragging');
					}
					var moveX = event.targetTouches[0].pageX;
					var position = this.target.id === 'menu' ? moveX - this.startX : moveX - this.width;
					if (position > -this.width && position <= 0) {
						this.menu.style.transform = 'translateX(' + position + 'px)';
						this.param.detail.percent = 1 - Math.abs(position) / Math.abs(this.width);
						this.menu.dispatchEvent(this.ceUpdate);
					}
				}
			}
		}, {
			key: 'onTouchend',
			value: function onTouchend() {
				if (this.check) {
					var translateX = Number(this.menu.style.transform.replace(/[^\d]/g, ''));
					var method = translateX < this.width / 2 ? 'open' : 'close';
					this.check = false;
					this.menu.style.transform = '';
					this.menu.classList.remove('swipemenu--dragging');
					this[method]();
				}
			}
		}, {
			key: 'onTouchcancel',
			value: function onTouchcancel() {
				this.onTouchend();
			}
		}, {
			key: 'open',
			value: function open() {
				this.param.detail.percent = 1;
				this.param.detail.method = 'add';
				this.menu.dispatchEvent(this.ceEnd);
				this.menu.classList.add('swipemenu--open');
			}
		}, {
			key: 'close',
			value: function close() {
				this.param.detail.percent = 0;
				this.param.detail.method = 'remove';
				this.menu.dispatchEvent(this.ceEnd);
				this.menu.classList.remove('swipemenu--open');
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(event) {
				var ev = '' + event.type.charAt(0).toUpperCase() + event.type.slice(1);
				if (this['on' + ev]) {
					this['on' + ev](event);
				}
			}
		}]);
		return SwipeMenu;
	}();

	return SwipeMenu;

}));