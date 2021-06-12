
var weather = {
    init: function() {
        //XML запрос к сервису с валютными данными из Европейского ЦБ
        var req = new XMLHttpRequest();
        req.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Anapa,Russia&appid=b25c81f815c84b0ae2dcc0d4d773eacf&lang=ru", true);
        req.onload = this.getCourse.bind(this);
        req.send(null)
    },
    //Преобразование запроса в удобный для использования вид
    getCourse: function(e) {
        current = JSON.parse(e.target.responseText);
        this.setOnLoad();
    },


    setOnLoad: function(e) {
        console.log(current)
        const temper = document.querySelector('#current_temperature')

        const humidity = document.querySelector('#percent_humid')
        const wind_dir = document.querySelector('#direction')
        const wind_spd = document.querySelector('#speed')
        const weatherIcon = document.querySelector('#weather_icon')
        temper.textContent = (current.main.temp-273).toFixed(1) +'º C'
        humidity.textContent = current.main.humidity + '%'
        wind_dir.textContent = weather.windDirection()
        wind_spd.textContent = current.wind.speed + ' м/с'
        weatherIcon.setAttribute('src', weather.setIcon())
    },


	setDate() {
		var CurrentTime = new Date()
		var hour = CurrentTime.getHours()
		var minute = CurrentTime.getMinutes()

		if (hour < 10) {hour = '0' + hour}
		if (minute < 10) {minute = '0' + minute}

		CurrentTime = hour + ':' + minute;
		return CurrentTime
	},

    windDirection() {
        const degrees = current.wind.deg
        if (degrees >= 338 && degrees >= 0 && degrees <= 22) {return 'С'}
        else if (degrees >= 23 && degrees <= 67) {return 'С-Восток'}
        else if (degrees >= 68 && degrees <= 112) {return 'Восток'}
        else if (degrees >= 113 && degrees <= 157) {return 'Ю-Восток'}
        else if (degrees >= 158 && degrees <= 202) {return 'Юг'}
        else if (degrees >= 203 && degrees <= 247) {return 'Ю-Запад'}
        else if (degrees >= 248 && degrees <= 292) {return 'Запад'}
        else if (degrees >= 293 && degrees <= 337) {return 'С-Запад'}
    },

    setIcon() {
        const iconIDs = current.weather[0].id
        if(iconIDs === 800) {
            if (weather.setDate() < '21:00' && weather.setDate >= '06:00') {return 'http://openweathermap.org/img/wn/01d@2x.png'}
            else if (weather.setDate() >= '21:00' && weather.setDate < '06:00') {return 'http://openweathermap.org/img/wn/01n@2x.png'}
        }
        else if(iconIDs === 801){
            if (weather.setDate() < '21:00' && weather.setDate >= '06:00') {return 'http://openweathermap.org/img/wn/01d@2x.png'}
            else if (weather.setDate() >= '21:00' && weather.setDate < '06:00') {return 'http://openweathermap.org/img/wn/01n@2x.png'}
        }
        else if(iconIDs === 802) {return 'http://openweathermap.org/img/wn/03d@2x.png'}
        else if(iconIDs === 803 || iconIDs === 804) {return 'http://openweathermap.org/img/wn/04d@2x.png'}
        else if((iconIDs >= 300 && iconIDs <= 321) || (iconIDs >= 520 && iconIDs<=531)) {return 'http://openweathermap.org/img/wn/09d@2x.png'}
        else if(iconIDs >= 500 && iconIDs <= 504){
            if (weather.setDate() < '21:00' && weather.setDate >= '06:00') {return 'http://openweathermap.org/img/wn/01d@2x.png'}
            else if (weather.setDate() >= '21:00' && weather.setDate < '06:00') {return 'http://openweathermap.org/img/wn/01n@2x.png'}
        }
        else if(iconIDs >= 200 && iconIDs <= 232) {return 'http://openweathermap.org/img/wn/11d@2x.png'}
        else if((iconIDs >= 600 && iconIDs <= 622) || iconIDs === 511) {return 'http://openweathermap.org/img/wn/13d@2x.png'}
        else if(iconIDs >= 701 && iconIDs <= 781) {return 'http://openweathermap.org/img/wn/50d@2x.png'}
    }

};
//Прослушивание загрузки popup окна
document.addEventListener('DOMContentLoaded', function() {
    //Запуск метода init() при загрузке расширения
    weather.init();
})

setInterval(function() {
    const time = document.querySelector('#current_time')
    time.textContent = weather.setDate()
}, 1000)
const restart = document.querySelector('.restart_butt')
restart.addEventListener('click', function (event) {
    console.log('Я нажался!')
    weather.init();
})