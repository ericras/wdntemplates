define ([], () => {
	// const el = document.querySelector('.dcf-nav-local');
	// hoverintent(el, function() {
	// 		// Handler in
	// 		el.toggleAttribute('aria-expanded');
	// 	}, function() {
	// 		// Handler out
	// 	el.toggleAttribute('aria-expanded');
	// 	});
/**
 * Base class to set up any kind of Intent
 * */
	class Intent {
		constructor(el, options = {} ) {
			this.el = el;
			this.options = options;
		}
	}

	/**
	* HoverIntent subclass that uses the hoverintent library
	 * @param el - the element to attach hoverintent to
	 * @param options - [optional] options for configuring hoverintent
	 * @param mq - [optional] media query conditions for handling isMobile vs otherwise
	 * @param handleIn - callback function to handle hover in behavior for the selected element
	 * @param handleOut - callback function to handle hover out behavior for the selected element
	 * @package (hoverintent)[https://github.com/tristen/hoverintent]
	* */
	class HoverIntent extends Intent {
		constructor(el, options = {}, mq = '', handleIn, handleOut) {
			super(el, options);
			this.handleIn = handleIn;
			this.handleOut = handleOut;
			this.mq = mq;
			// bind context of this to the HoverIntent
			// instance since it can be overwritten by the matchMedia event listener. Another alternative is to write
			// handleMediaChanges using arrow functions to prevent rebounding of this
			// this.handleMediaChanges = this.handleMediaChanges.bind(this);
		}

		hoverListener;
		isMobile = true;

		addListener() {
			this.hoverListener = hoverintent(this.el, this.handleIn, this.handleOut ).options(this.options);
			console.log(this.hoverListener);
		}

		removeListener() {
			if(this.hoverListener) this.hoverListener.remove();
		}

		handleMediaChanges = (mql) => {
			// console.log(mql);
			if (mql.matches) {
				this.isMobile = false;
				console.log('in add');
				console.log(this);
				this.addListener();
				console.log('added');
			} else {
				this.isMobile = true;
				console.log('in remove');
				console.log(this);
				this.removeListener();
				console.log('removed');
			}
		}

		onWidthChange() {
			const mediaQueryList = window.matchMedia(this.mq);
			console.log('onwidthchange', this);
			mediaQueryList.addListener(this.handleMediaChanges);
		}

		initialize() {
			const mediaQueryList = window.matchMedia(this.mq);
			this.handleMediaChanges(mediaQueryList);
			console.log('initialize', this);
			this.onWidthChange();
		}
	}

	/**
	 * Setting up localNav hover intent
	 * */
	const localNav = document.querySelector('.dcf-nav-local');

	function navHandleIn() {
		this.previousElementSibling.setAttribute('aria-expanded', true);
	}

	function navHandleOut() {
		this.previousElementSibling.removeAttribute('aria-expanded');
	}

	const navMQ = 'screen and (min-width: 56.123125em)';
	const navIntent = new HoverIntent(localNav, undefined, navMQ,navHandleIn,navHandleOut);

	window.addEventListener("DOMContentLoaded", navIntent.initialize);
});

