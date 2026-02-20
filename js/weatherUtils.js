export function getWeatherIcon(weatherId) {
	switch (true) {
		case weatherId >= 200 && weatherId < 300:
			return "⛈";

		case weatherId >= 300 && weatherId < 400:
			return "🌧";

		case weatherId >= 500 && weatherId < 600:
			return "☔";

		case weatherId >= 600 && weatherId < 700:
			return "❄";

		case weatherId >= 700 && weatherId < 800:
			return "🌫";
		case weatherId == 800:
			return "☀";

		case weatherId >= 801 && weatherId < 810:
			return "☁";

		default:
			return "❓";
	}
}

export function getBackgroundColor(weatherId) {
	switch (true) {
		case weatherId >= 200 && weatherId < 300:
			return "lightgray";

		case weatherId >= 300 && weatherId < 400:
			return "lightblue";

		case weatherId >= 500 && weatherId < 600:
			return "steelblue";

		case weatherId >= 600 && weatherId < 700:
			return "white";

		case weatherId >= 700 && weatherId < 800:
			return "silver";

		case weatherId === 800:
			return "gold";

		case weatherId >= 801:
			return "gray";

		default:
			return "lightgreen";
	}
}
