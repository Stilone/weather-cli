import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./store-service.js";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getWeather = async (city) => {
    
    const token = process.env.token ?? await getKeyValue(TOKEN_DICTIONARY.token);
    
    if (!token) {
        throw new Error("не задан ключ api, задайте его через команду -t [API_KEY]")
    }

    const { data } = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            appid: token,
            lang: "ru",
            units: "metric"
        }
    });
    
    return(data)
};


export { getWeather, getIcon };