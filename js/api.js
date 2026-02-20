export async function getWeather(city) {
	const apiKey = "e54e93480410a97a17ce500fa09aeadd";
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error("Invalid city");
	}

	return await response.json();
}
