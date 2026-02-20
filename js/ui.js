import { getWeatherIcon, getBackgroundColor } from "./weatherUtils.js";
import { card } from "./main.js";
export function displayWeather(data) {
	const {
		name: name,
		main: { temp, humidity },
		wind: { speed },
		weather: [{ id, description }],
	} = data;

	card.textContent = "";
	card.classList.remove("none");
	const celsius = (temp - 273.15).toFixed(1);
	const fahrenheit = (((temp - 273.15) * 9) / 5 + 32).toFixed(1);

	const cityDisplay = document.createElement("h1");
	const weatherDisplayInC = document.createElement("p");
	const weatherDisplayInF = document.createElement("p");
	const weatherIcon = document.createElement("p");
	const humidityDisplay = document.createElement("p");
	const windSpeedDisplay = document.createElement("p");
	const descriptionDisplay = document.createElement("p");
	const toggleTempDisplay = document.createElement("button");

	cityDisplay.classList.add("cityDisplay");
	weatherDisplayInC.classList.add("weatherDisplayInC");
	weatherDisplayInF.classList.add("weatherDisplayInF");
	humidityDisplay.classList.add("weatherHumidityDisplay");
	windSpeedDisplay.classList.add("weatherWindSpeedDisplay");
	descriptionDisplay.classList.add("descDisplay");
	weatherIcon.classList.add("weatherIconDisplay");
	toggleTempDisplay.classList.add("toggleTempButton");

	cityDisplay.textContent = name;
	weatherDisplayInC.textContent = `${celsius}°C`;
	weatherDisplayInF.textContent = `${fahrenheit}°F`;
	weatherIcon.textContent = getWeatherIcon(id);
	humidityDisplay.textContent = `Humidity: ${humidity}%`;
	windSpeedDisplay.textContent = `Wind speed: ${speed} km/h`;
	descriptionDisplay.textContent = `Description: ${description}`;
	toggleTempDisplay.textContent = "Toggle °C / °F";

	toggleTempDisplay.addEventListener("click", toggleTemperature);
	card.style.background = getBackgroundColor(id);
	card.append(
		cityDisplay,
		weatherDisplayInC,
		weatherDisplayInF,
		toggleTempDisplay,
		weatherIcon,
		humidityDisplay,
		windSpeedDisplay,
		descriptionDisplay,
	);
}

export function toggleTemperature() {
	const celsius = document.querySelector(".weatherDisplayInC");
	const fahrenheit = document.querySelector(".weatherDisplayInF");

	if (celsius.style.display !== "none") {
		celsius.style.display = "none";
		fahrenheit.style.display = "block";
	} else {
		celsius.style.display = "block";
		fahrenheit.style.display = "none";
	}
}

export function displayError(message) {
	const errorDisplay = document.createElement("p");
	errorDisplay.classList.add("error");
	errorDisplay.textContent = message;

	card.textContent = "";
	card.style.display = "flex";
	card.appendChild(errorDisplay);
}
