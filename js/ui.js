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
	const cities = JSON.parse(localStorage.getItem("cities")) || [];
	let lastId = Number(localStorage.getItem("lastId") || 0);
	let city_id;
	let existingCity = cities.find(
		(city) => city.name.toLowerCase() === name.toLowerCase(),
	);
	if (existingCity) {
		city_id = existingCity.id;
	} else {
		lastId++;
		city_id = lastId;
		const newCity = {
			id: city_id,
			name: name,
			temp: celsius,
			desc: description,
		};
		cities.push(newCity);
	}

	const cityDisplay = document.createElement("h1");
	const weatherDisplayInC = document.createElement("p");
	const weatherDisplayInF = document.createElement("p");
	const weatherIcon = document.createElement("p");
	const humidityDisplay = document.createElement("p");
	const windSpeedDisplay = document.createElement("p");
	const descriptionDisplay = document.createElement("p");
	const toggleTempDisplay = document.createElement("button");
	const favouriteButton = document.createElement("button");

	cityDisplay.classList.add("cityDisplay");
	weatherDisplayInC.classList.add("weatherDisplayInC");
	weatherDisplayInF.classList.add("weatherDisplayInF");
	humidityDisplay.classList.add("weatherHumidityDisplay");
	windSpeedDisplay.classList.add("weatherWindSpeedDisplay");
	descriptionDisplay.classList.add("descDisplay");
	weatherIcon.classList.add("weatherIconDisplay");
	toggleTempDisplay.classList.add("toggleTempButton");
	const favouriteCities = JSON.parse(localStorage.getItem("favourites")) || [];
	const exists = favouriteCities.some((fav) => fav.city_id === city_id);
	if (!exists) {
		favouriteButton.textContent = "Add to favourite";
		favouriteButton.classList.add("favouriteButton");
	} else {
		favouriteButton.textContent = "Unfavourite";
		favouriteButton.classList.add("unfavouriteButton");
	}

	cityDisplay.textContent = name;
	weatherDisplayInC.textContent = `${celsius}°C`;
	weatherDisplayInF.textContent = `${fahrenheit}°F`;
	weatherIcon.textContent = getWeatherIcon(id);
	humidityDisplay.textContent = `Humidity: ${humidity}%`;
	windSpeedDisplay.textContent = `Wind speed: ${speed} km/h`;
	descriptionDisplay.textContent = `Description: ${description}`;
	toggleTempDisplay.textContent = "Toggle °C / °F";

	toggleTempDisplay.addEventListener("click", toggleTemperature);
	if (existingCity) {
		favouriteButton.addEventListener("click", (event) =>
			favouriteCity(existingCity.id, event),
		);
	} else {
		favouriteButton.addEventListener("click", (event) =>
			favouriteCity(lastId, event),
		);
	}
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
		favouriteButton,
	);
	localStorage.setItem("cities", JSON.stringify(cities));
	localStorage.setItem("lastId", lastId);
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

export function favouriteCity(id, event) {
	let button = event.currentTarget;
	const cities = JSON.parse(localStorage.getItem("cities")) || [];
	const city = cities.find((c) => c.id === id);
	if (city) {
		let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
		const exists = favourites.some((fav) => fav.city_id === id);
		if (!exists) {
			const cityData = {
				city_id: id,
				name: city.name,
				description: city.desc,
			};
			favourites.push(cityData);
			localStorage.setItem("favourites", JSON.stringify(favourites));
			button.textContent = "Unfavourite";
			button.classList.remove("favouriteButton");
			button.classList.add("unfavouriteButton");
		} else {
			unfavouriteCity(id, button);
		}
	}
}

export function unfavouriteCity(id, button) {
	let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
	const updatedFavourites = favourites.filter((fav) => fav.city_id !== id);
	localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
	if (button) {
		button.textContent = "Add to favourite";
		button.classList.remove("unfavouriteButton");
		button.classList.add("favouriteButton");
		button.classList.remove("disabledButton");
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
