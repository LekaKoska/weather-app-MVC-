import { getWeather } from "./api.js";
import {
	displayWeather,
	toggleTemperature,
	displayError,
	favouriteCity,
} from "./ui.js";

const formWeather = document.querySelector(".formWeather");
export const card = document.querySelector(".card");
const cityInput = document.querySelector(".cityInput");
const toggleTemp = document.querySelector(".toggleTempButton");

formWeather.addEventListener("submit", async (event) => {
	event.preventDefault();

	const city = cityInput.value;

	if (city) {
		try {
			const weatherData = await getWeather(city);
			displayWeather(weatherData);

			window.history.pushState({}, "", `?city=${city}`);
		} catch (e) {
			displayError(e);
		}
	} else {
		displayError("Enter a valid city");
	}
});

const params = new URLSearchParams(window.location.search);
const cityFromUrl = params.get("city");

if (cityFromUrl) {
	getWeather(cityFromUrl)
		.then((data) => displayWeather(data))
		.catch((err) => displayError(err));
}
