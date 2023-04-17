import chalk from "chalk";      // библиотека, которая позволяет окрашивает цветом текст в console.log
import dedent from "dedent-js"; // библиотека, чтобы убрать отступы в console.log

const printError = (error) => {
    console.log(chalk.bgRed(" ERROR ") + " " + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
}

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(" HELP ")}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        `)
    );
};

const printWeather = (res, icon) => {
    console.log(
        dedent(`${chalk.bgYellow(" WEATHER ")} Погода в городе ${res.name}
        ${icon}  ${res.weather[0].description}
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}%
        Скорость ветра: ${res.wind.speed}
        `)
    );
};

export { printError, printSuccess, printHelp, printWeather };