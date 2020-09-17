$(function () {
    const API_KEY = '330a2321f466135ed43854c0df705152';
    const URL = "http://api.openweathermap.org/data/2.5/";
    const UNITS = "metric";
    const DEGREE = "&#176;";
    let regexTime = /\b(\d{2})\:+\b/;

    $("#main-container-5-day-forecast").hide();

    //получение текущей даты
    let todayDate = new Date();
    $("#current-date").html(`${todayDate.getDate() + "." + todayDate.getMonth() + "." + todayDate.getFullYear() }`);

    //select page 
    if ($(".btn-forecast").click(e => {
            $("#main-container-5-day-forecast").show(100);
            $("#body-container").hide();
        }))


        if ($(".btn-today").click(e => {
                $("#body-container").show(100);
                $("#main-container-5-day-forecast").hide();
            }))




            // $("#body-container").fadeIn(100);
            //     $("#main-container-5-day-forecast").fadeOut(100);
            //     $(".btn-today").addClass("active");

            //     $(".btn-today").click(function(){
            //         $("#body-container").fadeIn(100);
            //         $("#main-container-5-day-forecast").fadeOut(100);
            //         $(".btn-forecast").removeClass("active");
            //         $(this).addClass("active");
            //     })

            //     $("#btn-forecast").click(function(){
            //         $("#main-container-5-day-forecast").fadeIn(100);
            //         $("#body-container").fadeOut(100);
            //         $(".btn-today").removeClass("active");
            //         $(this).addClass("active");
            //     })




            //функция для определения иконки погоды
    function getRightIcon(weather) {
        let iconElement = $("<img>");
        switch (weather) {
            case "Clouds": {
                iconElement.attr("src", "img/clouds.png");
                iconElement.attr("alt", "Cloudy");
                iconElement.addClass("icon-weather");
                break;
            }

            case "Clear": {
                iconElement.attr("src", "img/clear-sky.png");
                iconElement.attr("alt", "Clear");
                iconElement.addClass("icon-weather");
                break;
            }


            case "Sunny": {
                iconElement.attr("src", "img/солнце.png");
                iconElement.attr("alt", "Sunny");
                iconElement.addClass("icon-weather");
                break;
            }

            case "Rain": {
                iconElement.attr("src", "img/rain.png");
                iconElement.attr("alt", "rain");
                iconElement.addClass("icon-weather");
                break;
            }
            case "Snow": {
                iconElement.attr("src", "img/snow.png");
                iconElement.attr("alt", "Snowing");
                iconElement.addClass("icon-weather");
                break;
            }
            case "Fog":{
                iconElement.attr("src", "img/fog.png");
                iconElement.attr("alt", "Foggy");
                iconElement.addClass("icon-weather");
            }
        }
        return iconElement;
    }

    //change to the str day
    function changeToStrDay(day) {
        let strDay;
        switch (day) {
            case 0: {
                strDay = 'Sun';
                break;
            }
            case 1: {
                strDay = 'Mon';
                break;
            }


            case 2: {
                strDay = 'Tue';
                break;
            }

            case 3: {
                strDay = 'Wed';
                break;
            }
            case 4: {
                strDay = 'Thu';
                break;
            }
            case 5: {
                strDay = 'Fr';
                break;
            }
            case 6: {
                strDay = 'Sat';
            }


        }
        return strDay;
    }


    // function getRightTime(str,str2,str3){

    // }


    function getLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                /////////////////

                $.get({
                    url: URL + "weather",
                    data: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        appid: API_KEY,
                        units: UNITS
                    }
                }).done(result => {
                    console.log(result);
                    $("#real-feel>p").html(`${result.main.temp} &#176;C <br> real feel `);

                    $('#weather-for-one-day>p').html(`${result.weather[0].main}`);

                    $("#weather-for-one-day").append(getRightIcon(result.weather[0].main));

                    let sunriseTime = new Date(result.sys.sunrise * 1000);
                    //sunriseTime.getHours(result.sys.sunrise * 1000);
                    let sunsetTime = new Date(result.sys.sunset * 1000);

                    //????
                    // let dur = (result.sys.sunset * 1000) - (result.sys.sunrise * 1000);
                    // let duration = new Date(dur * 1000);

                    // console.log(duration);
                    // let stringDuration = duration.toString();
                    //?????


                    let stringSunrise = sunriseTime.toString();
                    let stringSunset = sunsetTime.toString();
                    //console.log(stringSunrise);
                    //console.log(sunsetTime);
                    //console.log(sunriseTime);
                    $("#sunrise").html(`Sunrise: ${stringSunrise.slice(17,21)} a.m`);
                    $("#sunset").html(`Sunset: ${stringSunset.slice(16,21)} p.m`);
                    $("#duration").html(`Duration: ${duration} `);

                }).fail(err => {
                    alert("Error");
                })

                //////////////////////////
                $.get({
                    url: URL + "forecast",
                    data: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        appid: API_KEY,
                        units: UNITS
                    }
                }).done(result => {
                    console.log(result);
                    //get a coolection of <th>

                    //let collectionTh = document.getElementsByTagName("th");
                    //console.log(collectionTh);
                    let thTodayStr = $("#today-str>th");
                    //let regexStrTime = /\b[0]+\b/;
                    //filling today str
                    for (let i = 1; i < thTodayStr.length; i++) {
                        //get time from forecast
                        let time = new Date(result.list[i].dt * 1000);
                        let stringTime = time.toString();
                        console.log(stringTime);
                        let resStr = stringTime.slice(16, 18);
                        if (resStr.includes("0") && resStr.indexOf("0") === 0 && resStr <= 12) {
                            $(thTodayStr[i]).html(resStr.slice(1) + "a.m");
                        } else {
                            $(thTodayStr[i]).html(resStr + "p.m");
                        }
                        
                        // if (regexTime.test(time)) {
                        //     //create time without sec and min
                        //     let newTime = time.match(regexTime);

                        // }
                    }
                    
                    //console.log($("#today-str>th"));
                    /////////

                    //forecast str
                    let tdForecastStr = $("#forecast-str>td");
                    for (let i = 1; i < tdForecastStr.length; i++) {
                        let weatherForecast = result.list[i].weather[0].main;

                        $(tdForecastStr[i]).html(weatherForecast);
                        $(tdForecastStr[i]).append(getRightIcon(weatherForecast));
                    }
                    /////////


                    //почему-то не работает!!!!
                    //temp str
                    let tdTempStr = $("#temp-str>td");
                    for (let i = 1; i < tdTempStr.length; i++) {
                        let tmpTemp = result.list[i].main.temp;
                        $(tdTempStr[i]).html(`${Math.round(tmpTemp)}&#176;C`);
                    }
                    //////

                    //real-feel-str
                    let tdRealFeel = $("#real-feel-str>td");
                    for (let i = 1; i < tdRealFeel.length; i++) {
                        let realFeel = result.list[i].main.temp_max;
                        $(tdRealFeel[i]).html(`${Math.round(realFeel)}&#176;C`);
                    }
                    ///

                    //wind speed str
                    let tdWindSpeedStr = $("#wind-speed-str>td");
                    for (let i = 1; i < tdWindSpeedStr.length; i++) {
                        let windSpeed = result.list[i].wind.speed;
                        $(tdWindSpeedStr[i]).html(windSpeed);
                    }

                })

            })


        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    getLocation();



    //select 5-day forecast





    function getLocation2() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                $.get({
                    url: URL + "forecast",
                    data: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        appid: API_KEY,
                        units: UNITS
                    }
                }).done(result => {
                    //console.log($(".day").length);

                    // for (let i = 0; i < $("#first-container>div").length; i++) {

                    // }
                    let tmpDay = $(".day");
                    // for (let i = 0; i < result.list.length; i += 8) {
                    //     for (let j = 0; j < tmpDay.length; j++) {
                    //         let newDate = new Date();
                    //         currDay = newDate.getDay();
                    //         $(tmpDay[j]).append(changeToStrDay(currDay));
                    //     }
                    // }
                    console.log(tmpDay);
                    for (let i = 0, j = 0; j < tmpDay.length && i < result.list.length; j++, i += 8) {
                        let newDate = new Date(result.list[i].dt * 1000);
                        let currDay = newDate.getDay();
                        $(tmpDay[j]).append(changeToStrDay(currDay));
                        //console.log(tmpDay[j], j, i, currDay);


                    }




                    //get icon for day
                    let firstContainer = $("#first-container>div");
                    for (let j = 0, i = 0; i < firstContainer.length && j < result.list.length; i++, j += 8) {
                        let getWeather = result.list[j].weather[0].main;
                        // getWeather.addClass("icon-position-5day");
                        $(firstContainer[i]).append(getRightIcon(getWeather));
                        console.log(firstContainer[i], j, i, firstContainer);
                    }


                    //temp
                    let temperatureDays = $(".temp-by-days");
                    for (let j = 0, i = 0; i < temperatureDays.length && j < result.list.length; i++, j += 8) {
                        let currTemp = result.list[j].main.temp;
                        $(temperatureDays[i]).html(`${Math.round(currTemp)}&#176;C`);

                        //console.log(temperatureDays[i], j, i, temperatureDays);
                    }
                    let feelling = $(".feelling");


                    let thTodayStr = $("#today-str>th");
                    //let regexStrTime = /\b[0]+\b/;
                    //filling today str
                    

                })


                

            })
        }
    }
    getLocation2();





})


// navigator.geolocation.getCurrentPosition(pos =>{
//     console.log(pos.coords.latitude ) ;
//     console.log(pos.coords.longitude ) ;
// })