import { getWeather } from "./api.js";
import { displayWeather, toggleTemperature, displayError } from "./ui.js";

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
		} catch (e) {
			displayError(e);
		}
	} else {
		displayError("Enter a valid city");
	}
});
