'use strict';

window.onload = function() {
	// page-nav
	let menuTriggers = document.querySelectorAll('.header__menu, .page__darker'),
		pageBody = document.querySelector('body');
	for (let menuTrigger of menuTriggers) {
		menuTrigger.addEventListener('click', function () {
			pageBody.classList.toggle('open-nav');
		});
	}

	let textTruncateList = document.querySelectorAll('[data-tuncate]');
	for (let textTruncate of textTruncateList) {
		textTruncate.setAttribute('data-text', textTruncate.innerHTML);
	}

	function textCutter() {
		// line-cutter
		let getStyle,
			textContainer,
			containerTextMaxHeight,
			regex = /[\d|,|.|e|E|\+]+/g;
		
		for (let textTruncate of textTruncateList) {
			textContainer = textTruncate.parentNode;
			getStyle = window.getComputedStyle(textTruncate);
			containerTextMaxHeight = Math.round(+getStyle.getPropertyValue('line-height').match(regex) * 2);
			if (textTruncate.offsetHeight > containerTextMaxHeight) {
				textContainer.style.cssText = `
					height: ${containerTextMaxHeight + 'px'};
					overflow: hidden;
				`;
			}

			let text = textTruncate.getAttribute('data-text');
			textTruncate.innerHTML = '';
			for (let chair of text) {
				if (textContainer.offsetHeight >= textTruncate.offsetHeight) {
					textTruncate.innerHTML += chair;
				} else break;
			}
			textTruncate.innerHTML = textTruncate.innerHTML.substring(0, textTruncate.innerHTML.length - 3);
			if (textTruncate.innerHTML.slice(-1) === ' ') {
				textTruncate.innerHTML = textTruncate.innerHTML.substring(0, textTruncate.innerHTML.length - 1);
			}
			textTruncate.innerHTML += '...'
		}
	}

	textCutter();

	window.addEventListener('resize', function () {
		textCutter();
	});

	
	//tabs
	let triggersList = document.querySelectorAll('[data-tab]'),
		contentList = document.querySelectorAll('[data-content]');

	for (let trigger of triggersList) {
		trigger.addEventListener('click', (event) => {
			event.preventDefault();

			for (let trigger of triggersList) {
				trigger.classList.remove('tab_active');
			}
			trigger.classList.add('tab_active');

			for (let content of contentList) {
				content.classList.add('card-info__content_hidden');
				if (+trigger.getAttribute('data-tab').match(/\d+/g) === +content.getAttribute('data-content').match(/\d+/g)) {
					content.classList.remove('card-info__content_hidden');
				}
			}
		});
	}

	let p = location.search.substring(1).split('&');
	let op = {};
	for (let i in p) {
		if (!p[i] || !p[i].split) continue;
		let x = p[i].split('=');
		op[x[0]] = x[1];
	}

	if (op.tab) {
		let tabHeadList = document.querySelectorAll('[data-tab]');
		for (let tabHead of tabHeadList) {
			if (tabHead.getAttribute('data-tab') === op.tab) {
				tabHead.classList.add('tab_active');
			} else {
				tabHead.classList.remove('tab_active');
			}
		}

		let tabList = document.querySelectorAll('[data-content]');

		for (let tab of tabList) {
			if (tab.getAttribute('data-content') === op.tab) {
				tab.classList.remove('card-info__content_hidden');
			} else {
				tab.classList.add('card-info__content_hidden');
			}
		}
	}
	
	//modals
	let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth,
		pageHeader = document.querySelector('.page__header');

	const myModal = new HystModal({
		linkAttributeName: "data-hystmodal",
		beforeOpen: function(){
			pageHeader.style.paddingRight = scrollbarWidth + 'px';
		},
		afterClose: function(){
			pageHeader.style.paddingRight = '0';
		}
	});
	myModal.init();
	
	//inputmask
	let inputTelList = document.querySelectorAll('[data-mask-tel]');
	for (let inputTel of inputTelList) {
		let im = new Inputmask('+7 999 999-99-99');
		im.mask(inputTel);
	}

	//swiper
	const swiperList = document.querySelectorAll('.slider__container');
	for (let i = 0; i < swiperList.length; i++) {
		swiperList[i].classList.add('slider__container_' + i);
		swiperList[i].nextElementSibling.classList.add('slider__pagination_' + i);
		swiperList[i].nextElementSibling.nextElementSibling.classList.add('slider__button_prev-' + i);
		swiperList[i].nextElementSibling.nextElementSibling.nextElementSibling.classList.add('slider__button_next-' + i);
		
		const swiper = new Swiper('.slider__container_' + i, {
			loop: true,
			pagination: {
				el: '.slider__pagination_' + i,
				clickable: true,
			},
			navigation: {
				nextEl: '.slider__button_next-' + i,
				prevEl: '.slider__button_prev-' + i,
			},
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
			},
			debugger: true,
			mousewheel: true,
		});
	}
}



