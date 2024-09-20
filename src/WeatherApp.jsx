import './WeatherApp.css';
import {useState} from "react";

export const WeatherApp = () => {

	const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
	const API_KEY = '';
	const lang = 'es';
	const diffKelvin = 273.15; // Obtener temperatura en Celsius restar diffKelvin

	const [city, setCity] = useState("")
	const [dataWeather, setDataWeather] = useState(null);

	const fetchWeatherData = async () => {
		if (!city) return;
		try {
			const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=${lang}`);
			if (response.status === 404) return;
			const data = await response.json();
			setDataWeather(data);
		} catch (error) {
			console.error('A ocurrido un error', error);
		}

	}

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchWeatherData();
	}

	const handleChange = (event) => {
		setCity(event.target.value);
	}

	return (
		<>
			<div className="container">
				<h1>Aplicación del Clima</h1>
				<form onSubmit={handleSubmit}>
					<input type={"text"} placeholder={"Ingrese una ciudad"} onChange={handleChange} value={city}/>
					<button type={"submit"}>Buscar</button>
				</form>
			</div>
			{dataWeather && (
				<div className={"container-weather"}>
					<h2>{dataWeather.name}, {dataWeather.sys.country}</h2>
					<p>La temperatura actual es: {Math.floor(dataWeather.main.temp - diffKelvin)}°C</p>
					<p>La condicion meteorologica actual es: {dataWeather.weather[0].description}</p>
					<img src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}
					     alt={dataWeather.weather.description}/>
				</div>
			)}
		</>
	)
}