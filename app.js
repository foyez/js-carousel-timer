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
