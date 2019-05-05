// ============================== COUNTDOWN TIMER ================================
const target_date = new Date().getTime() + 1000 * 3600 * 24;
let days, hours, minutes, seconds;

const pad = (n) => (n < 10 ? '0' : '') + n;

const getCountdown = () => {
	const current_date = new Date().getTime();
	let seconds_left = (target_date - current_date) / 1000;

	if (parseInt(seconds_left) === 0) {
		clearInterval(intervalId);
	}

	hours = pad(parseInt(seconds_left / 3600));
	seconds_left = seconds_left % 3600;

	minutes = pad(parseInt(seconds_left / 60));
	seconds = pad(parseInt(seconds_left % 60));

	document.querySelector('.hours__number').textContent = hours;
	document.querySelector('.mins__number').textContent = minutes;
	document.querySelector('.seconds__number').textContent = seconds;
};

getCountdown();
const intervalId = setInterval(() => getCountdown(), 1000);

// ============================== INFINITE CAROUSEL SLIDER ================================

let index = 0;
let amount = 0;
let currTranslation = [];
let translationComplete = true;

const images = document.querySelectorAll('.slide');
let size =
	Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 1200
		? images[0].clientWidth
		: images[0].clientWidth + 20;

const transitionCompleted = () => (translationComplete = true);

document.addEventListener('DOMContentLoaded', () => {
	amount = document.querySelectorAll('.slide').length;
	images.forEach((img, i) => {
		currTranslation[i] = -size;
		img.addEventListener('transitionend', transitionCompleted, true);
	});
});

const left = () => {
	window.onresize = () => {
		timeoutId.pause;
		clearTimeout(timeoutId);

		index = 0;
		currTranslation = [];

		const windowSize = Math.max(
			document.documentElement.clientWidth,
			window.innerWidth || 0
		);

		size =
			windowSize <= 1200 ? images[0].clientWidth : images[0].clientWidth + 20;

		images.forEach((img, i) => {
			currTranslation[i] = -size;
			img.addEventListener('transitionend', transitionCompleted, true);
		});
		left();
	};

	if (translationComplete) {
		translationComplete = false;
		index++;

		images.forEach((img, i) => {
			img.style.opacity = 1;
			img.style.transform = 'translate(' + (currTranslation[i] - size) + 'px)';
			currTranslation[i] = currTranslation[i] - size;
		});

		var outerIndex = (index - 1) % amount;

		var outerImg = document.querySelectorAll('.slide')[outerIndex];
		outerImg.style.transform =
			'translateX(' + (currTranslation[outerIndex] + size * amount) + 'px)';
		outerImg.style.opacity = '0';
		currTranslation[outerIndex] = currTranslation[outerIndex] + size * amount;
	}

	const timeoutId = setTimeout('left()', 3500);
};

window.onload = left;
