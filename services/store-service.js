import { homedir } from "os"; //Эта библиотека работает как на Mac, так и на Windows, и выводить домашнюю директорию текущего пользователя.
import { join } from "path"; //  join, используется для объединения путей в кроссплатформенном формате. basename - получить часть пути папки (weather-data.json). dirname (C:\Users\Dmitry.Astashin). extname (.json). relative принимает 2 параметра relative(filePath, dirname(filePath) и говорит что нам нужно сделать, чтобы придти из одной точки в другую, isAbsolute - абсолютный путь true, отностительный false. sep - посмотреть сипаратор
import { promises } from "fs"; // writeFileSync - синхронная функция, которая блокирает наш поток и сохраняет файл. promises - получить информацию о файловой системе читать и записывать

const filePath = join(homedir(), "weather-data.json"); // выводит путь к текущему пользователю, без join C:\Users\Dmitry.Astashin, с ним C:\Users\Dmitry.Astashin\weather-data.json (c шагом назад ../) и записывает имя

const TOKEN_DICTIONARY = {
    token: "token",
    city: "city"
}

const saveKeyValue = async (key, value) => { // функция сохранения в наш сторедж
    let data = {};
    if(await isExist(filePath)) { //если true то считаем файл и распарсим и продолжим, если нет то создадим новый файл
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data))
};

const getKeyValue = async (key) => { // функция получения из нашего стореджа
    if(await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined
};

const isExist = async (path) => { // проверка пути 
    try {
        await promises.stat(path)
        return true
    } catch (e) {
        return false
    }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };