const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
const container = document.querySelector(".cards-container");
const error = document.querySelector(".errorDisplay");

if (favourites.length === 0) {
	error.classList.add("error");
	error.textContent = "No favourites city";
	const backButton = document.createElement("button");
	backButton.textContent = "Back";
	backButton.onclick = function () {
		window.location.href = "/weather-app/index.html";
	};
	backButton.classList.add("favouriteButton");
	container.appendChild(backButton);
}

container.classList.add("card-container");

favourites.forEach((city) => {
	const card = document.createElement("div");
	card.classList.add("card");

	const cityDisplay = document.createElement("h1");
	const descriptionDisplay = document.createElement("p");

	cityDisplay.classList.add("cityDisplay");
	descriptionDisplay.classList.add("descDisplay");

	cityDisplay.textContent = city.name;
	descriptionDisplay.textContent = city.description;

	card.append(cityDisplay, descriptionDisplay);
	container.appendChild(card);
});
