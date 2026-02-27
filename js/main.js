import { getWeather } from "./api.js";
import { displayWeather, displayError } from "./ui.js";

const formWeather = document.querySelector(".formWeather");
const cityInput = document.querySelector(".cityInput");

async function updateWeather(city) {
	if (!city || city.trim() === "") {
		displayError("Please enter a valid city name");
		return;
	}
	try {
		const weatherData = await getWeather(city.trim());
		displayWeather(weatherData);
		const currentParams = new URLSearchParams(window.location.search);
		if (currentParams.get("city") !== city) {
			window.history.pushState({ city }, "", `?city=${city}`);
		}
	} catch (e) {
		displayError(e);
	}
}

formWeather.addEventListener("submit", async (event) => {
	event.preventDefault();
	updateWeather(cityInput.value);
});

const handleInitialLoad = () => {
	const params = new URLSearchParams(window.location.search);
	const cityFromUrl = params.get("city");
	if (cityFromUrl) {
		updateWeather(cityFromUrl);
	}
};

handleInitialLoad();

window.addEventListener("popstate", (event) => {
	handleInitialLoad();
});
