const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
const container = document.querySelector(".cards-container");
const error = document.querySelector(".errorDisplay");

container.classList.add("card-container");

function renderEmpty() {
	error.classList.add("error");
	error.textContent = "No favourite cities";

	const backButton = document.createElement("button");
	backButton.textContent = "Back";
	backButton.onclick = () => {
		window.location.href = "/weather-app/index.html";
	};
	backButton.classList.add("favouriteButton");

	container.appendChild(backButton);
}

function renderCard(city) {
	const card = document.createElement("div");
	card.classList.add("card");
	card.dataset.cityName = city.name;

	const cityDisplay = document.createElement("h1");
	const descriptionDisplay = document.createElement("p");

	cityDisplay.classList.add("cityDisplay");
	descriptionDisplay.classList.add("descDisplay");

	cityDisplay.textContent = city.name;
	descriptionDisplay.textContent = city.description;

	card.append(cityDisplay, descriptionDisplay);
	container.appendChild(card);
}

function attachCardClickListener() {
	container.addEventListener("click", (e) => {
		const card = e.target.closest(".card");
		if (!card) return;

		const cityName = card.dataset.cityName;

		window.location.href = `/weather-app/index.html?city=${cityName}`;
	});
}

if (favourites.length === 0) {
	renderEmpty();
} else {
	favourites.forEach(renderCard);
	attachCardClickListener();
}
