jQuery(function ($) {

	var BRUSHED = window.BRUSHED || {};

	/* ==================================================
	 Mobile Navigation
	 ================================================== */
	var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

	BRUSHED.mobileNav = function () {
		var windowWidth = $(window).width();

		if (windowWidth <= 979) {
			if ($('#mobile-nav').length > 0) {
				mobileMenuClone.insertAfter('#menu');
				$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
			}
		} else {
			$('#navigation-mobile').css('display', 'none');
			if ($('#mobile-nav').hasClass('open')) {
				$('#mobile-nav').removeClass('open');
			}
		}
	};

	BRUSHED.listenerMenu = function () {
		$('#mobile-nav').on('click', function (e) {
			$(this).toggleClass('open');

			if ($('#mobile-nav').hasClass('open')) {
				$('#navigation-mobile').slideDown(500, 'easeOutExpo');
			} else {
				$('#navigation-mobile').slideUp(500, 'easeOutExpo');
			}
			e.preventDefault();
		});

		$('#menu-nav-mobile').find('a').on('click', function () {
			$('#mobile-nav').removeClass('open');
			$('#navigation-mobile').slideUp(350, 'easeOutExpo');
		});
	};


	/* ==================================================
	 Slider Options
	 ================================================== */

	BRUSHED.slider = function () {
		$.supersized({

			// Functionality
			slideshow: 1,			// Slideshow on/off
			autoplay: 1,			// Slideshow starts playing automatically
			start_slide: 1,			// Start slide (0 is random)
			stop_loop: 0,			// Pauses slideshow on last slide
			random: 0,			// Randomize slide order (Ignores start slide)
			slide_interval: 5000,		// Length between transitions
			transition: 3, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed: 300,		// Speed of transition
			new_window: 1,			// Image links open in new window/tab
			pause_hover: 0,			// Pause slideshow on hover
			keyboard_nav: 1,			// Keyboard navigation on/off
			performance: 1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
			image_protect: 1,			// Disables image dragging and right click with Javascript

			// Size & Position
			min_width: 0,			// Min width allowed (in pixels)
			min_height: 0,			// Min height allowed (in pixels)
			vertical_center: 1,			// Vertically center background
			horizontal_center: 1,			// Horizontally center background
			fit_always: 0,			// Image will never exceed browser width or height (Ignores min. dimensions)
			fit_portrait: 1,			// Portrait images will not exceed browser height
			fit_landscape: 0,			// Landscape images will not exceed browser width

			// Components
			slide_links: 'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
			thumb_links: 0,			// Individual thumb links for each slide
			thumbnail_navigation: 0,			// Thumbnail navigation
			slides: [	// Slideshow Images
				{
					image: 'img/slider-images/image01.jpg',
					title: '<div class="slide-content">Melodrama-Chörli</div>',
					thumb: '',
					url: ''
				},
				{
					image: 'img/slider-images/image02.jpg',
					title: '<div class="slide-content">Melodrama-Chörli</div>',
					thumb: '',
					url: ''
				},
				{
					image: 'img/slider-images/image03.jpg',
					title: '<div class="slide-content">Melodrama-Chörli</div>',
					thumb: '',
					url: ''
				},
				{
					image: 'img/slider-images/image04.jpg',
					title: '<div class="slide-content">Melodrama-Chörli</div>',
					thumb: '',
					url: ''
				}
			],

			// Theme Options
			progress_bar: 0, // Timer for each slide
			mouse_scrub: 0

		});

	};


	/* ==================================================
	 Navigation Fix
	 ================================================== */

	BRUSHED.nav = function () {
		$('.sticky-nav').waypoint('sticky');
	};


	/* ==================================================
	 Filter Works
	 ================================================== */

	BRUSHED.filter = function () {
		if ($('#projects').length > 0) {
			var $container = $('#projects');

			$container.imagesLoaded(function () {
				$container.isotope({
					// options
					animationEngine: 'best-available',
					itemSelector: '.item-thumbs',
					layoutMode: 'fitRows'
				});
			});


			// filter items when filter link is clicked
			var $optionSets = $('#options .option-set'),
					$optionLinks = $optionSets.find('a');

			$optionLinks.click(function () {
				var $this = $(this);
				// don't proceed if already selected
				if ($this.hasClass('selected')) {
					return false;
				}
				var $optionSet = $this.parents('.option-set');
				$optionSet.find('.selected').removeClass('selected');
				$this.addClass('selected');

				// make option object dynamically, i.e. { filter: '.my-filter-class' }
				var options = {},
						key = $optionSet.attr('data-option-key'),
						value = $this.attr('data-option-value');
				// parse 'false' as false boolean
				value = value === 'false' ? false : value;
				options[key] = value;
				if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
					// changes in layout modes need extra logic
					changeLayoutMode($this, options)
				} else {
					// otherwise, apply new options
					$container.isotope(options);
				}

				return false;
			});
		}
	};


	/* ==================================================
	 FancyBox
	 ================================================== */

	BRUSHED.fancyBox = function () {
		if ($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0) {

			$(".fancybox").fancybox({
				padding: 0,
				beforeShow: function () {
					this.title = $(this.element).attr('title');
					this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
				},
				helpers: {
					title: {type: 'inside'}
				}
			});

			$('.fancybox-media').fancybox({
				openEffect: 'none',
				closeEffect: 'none',
				helpers: {
					media: {}
				}
			});
		}
	};


	/* ==================================================
	 Contact Form
	 ================================================== */

	BRUSHED.contactForm = function () {
		$("#contact-submit").on('click', function (e) {
			e.preventDefault();
			// var contact_form = $('#contact-form');
			// var fields = contact_form.serialize();
			var subject = $('#contact_subject');
			var message = $('#contact_message');
			var subjectText = subject.val() || '';
			var messageText = message.val() || '';
			var href = $('#contact-details-email').attr('href') + '?subject=';
			if (subjectText.length > 0) href += subjectText;
			else href += 'Kontakt-Formular';
			if (messageText.length > 0) href += '&body=' + messageText;
			window.open(href, '_self');
			subject.val('');
			message.val('');
		});
	};


	/* ==================================================
	 Menu Highlight
	 ================================================== */

	BRUSHED.menu = function () {
		$('#menu-nav, #menu-nav-mobile').onePageNav({
			currentClass: 'current',
			changeHash: false,
			scrollSpeed: 750,
			scrollOffset: 30,
			scrollThreshold: 0.5,
			easing: 'easeOutExpo',
			filter: ':not(.external)'
		});
	};

	/* ==================================================
	 Next Section
	 ================================================== */

	BRUSHED.goSection = function () {
		$('#nextsection').on('click', function () {
			var $target = $($(this).attr('href')).offset().top - 30;

			$('body, html').animate({scrollTop: $target}, 750, 'easeOutExpo');
			return false;
		});
	};

	/* ==================================================
	 GoUp
	 ================================================== */

	BRUSHED.goUp = function () {
		$('#goUp').on('click', function () {
			var $target = $($(this).attr('href')).offset().top - 30;

			$('body, html').animate({scrollTop: $target}, 750, 'easeOutExpo');
			return false;
		});
	};


	/* ==================================================
	 Scroll to Top
	 ================================================== */

	BRUSHED.scrollToTop = function () {
		var windowWidth = $(window).width(),
				didScroll = false;

		var $arrow = $('#back-to-top');

		$arrow.click(function (e) {
			$('body,html').animate({scrollTop: "0"}, 750, 'easeOutExpo');
			e.preventDefault();
		});

		$(window).scroll(function () {
			didScroll = true;
		});

		setInterval(function () {
			if (didScroll) {
				didScroll = false;

				if ($(window).scrollTop() > 1000) {
					$arrow.css('display', 'block');
				} else {
					$arrow.css('display', 'none');
				}
			}
		}, 250);
	};

	/* ==================================================
	 Thumbs / Social Effects
	 ================================================== */

	BRUSHED.utils = function () {

		var hasMSPrefix = window.MSPointerEvent; // check for MS vendor prefix
		var pointerEvents = {
			'pointerdown': hasMSPrefix ? "MSPointerDown" : 'pointerdown',
			'pointermove': hasMSPrefix ? "MSPointerMove" : 'pointermove',
			'pointerup': hasMSPrefix ? "MSPointerUp" : 'pointerup',
			'pointercancel': hasMSPrefix ? "MSPointerCancel" : 'pointercancel'
		};
		var hasPointer = navigator.msPointerEnabled || false; // MS feature detection
		var touchStartEvent = hasPointer ? pointerEvents['pointerdown'] : "touchstart";
		var touchEndEvent = hasPointer ? pointerEvents['pointerup'] : "touchend";

		$('.item-thumbs').on('tap', function () {
			$(".active").removeClass("active");
			$(this).addClass('active');
		});

		var imageWrap = $('.image-wrap');
		imageWrap.on(touchStartEvent + ' ' + touchEndEvent, function (event) { event.preventDefault(); });
		imageWrap.on('tap', function (event) {
			if ($(this).hasClass("active")) $(this).removeClass('active');
			else {
				$(".active").removeClass("active");
				$(this).addClass('active');
			}
			event.preventDefault();
			event.stopPropagation();
		});

		$('.social').on(touchEndEvent + ' click', 'a', function(e) {
			var href = $(this).attr('href');
			if (href.length > 1) {
				var icon = $(this).find('i');
				// twitter/facebook/google+ deep links on mobile, mail on browser & mobile
				if (icon.hasClass("font-icon-social-twitter")) {
					if (Modernizr.mobile) { window.open(href, '_blank'); }
				} else if (icon.hasClass("font-icon-social-facebook")) {
					if (Modernizr.mobile) { window.open(href, '_blank'); }
				} else if (icon.hasClass("font-icon-social-google-plus")) {
					if (Modernizr.mobile) { window.open(href, '_blank'); }
				} else if (icon.hasClass("font-icon-social-email")) {
					window.open(href, '_self');
				} else if (icon.hasClass("font-icon-social-wordpress")) {
					window.open(href, '_blank', 'location=yes');
				}
			}
			e.preventDefault();
		});

	};

	/* ==================================================
	 Accordion
	 ================================================== */

	BRUSHED.accordion = function () {
		var accordion_trigger = $('.accordion-heading.accordionize');

		accordion_trigger.delegate('.accordion-toggle', 'click', function (event) {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).addClass('inactive');
			}
			else {
				accordion_trigger.find('.active').addClass('inactive');
				accordion_trigger.find('.active').removeClass('active');
				$(this).removeClass('inactive');
				$(this).addClass('active');
			}
			event.preventDefault();
		});
	};

	/* ==================================================
	 Toggle
	 ================================================== */

	BRUSHED.toggle = function () {
		var accordion_trigger_toggle = $('.accordion-heading.togglize');

		accordion_trigger_toggle.delegate('.accordion-toggle', 'click', function (event) {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).addClass('inactive');
			}
			else {
				$(this).removeClass('inactive');
				$(this).addClass('active');
			}
			event.preventDefault();
		});
	};

	/* ==================================================
	 Tooltip
	 ================================================== */

	BRUSHED.toolTip = function () {
		$('a[data-toggle=tooltip]').tooltip();
	};


	/* ==================================================
	 Init
	 ================================================== */

	BRUSHED.slider();

	$(document).ready(function () {
		Modernizr.load([
			{
				test: Modernizr.placeholder,
				nope: 'js/placeholder.js',
				complete: function () {
					if (!Modernizr.placeholder) {
						Placeholders.init({
							live: true,
							hideOnFocus: false,
							className: "yourClass",
							textColor: "#999"
						});
					}
				}
			}
		]);

		// Preload the page with jPreLoader
		$('body').jpreLoader({
			splashID: "#jSplash",
			showSplash: true,
			showPercentage: true,
			autoClose: true,
			splashFunction: function () {
				$('#circle').delay(250).animate({'opacity': 1}, 500, 'linear');
			}
		});

		BRUSHED.nav();
		BRUSHED.mobileNav();
		BRUSHED.listenerMenu();
		BRUSHED.menu();
		BRUSHED.goSection();
		BRUSHED.goUp();
		BRUSHED.filter();
		BRUSHED.fancyBox();
		BRUSHED.contactForm();
		BRUSHED.scrollToTop();
		BRUSHED.utils();
		BRUSHED.accordion();
		BRUSHED.toggle();
		BRUSHED.toolTip();

		// Determine, whether it's a mobile device and add the result to Modernizr
		var ua = navigator.userAgent;
		var platform = navigator.platform;
		var os = this.os = {},
				android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
				ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
				ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
				iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
				wp = ua.match(/Windows Phone ([\d.]+)/),
				blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
				bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
				firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/);

		if (android) os.android = true;
		if (iphone && !ipod) os.ios = os.iphone = true;
		if (ipad) os.ios = os.ipad = true;
		if (ipod) os.ios = os.ipod = true;
		if (wp) os.wp = true;
		if (blackberry) os.blackberry = true;
		if (bb10) os.bb10 = true;
		if (firefoxos) os.firefoxos = true;

		Modernizr.addTest('mobile', function () {
			return (os.android || os.ios || os.wp || os.blackberry || os.bb10 || os.firefoxos);
		});

	});

	$(window).resize(function () {
		BRUSHED.mobileNav();
	});

});
