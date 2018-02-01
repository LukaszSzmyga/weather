function geo() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            loadWeather(position.coords.latitude + ',' + position.coords.longitude);
        }, loadDefaultLocation
        );
    } else {
         loadDefaultLocation;          
        };
};

$(document).ready(function() {
    setInterval(geo, 1800000);
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'c',
        success: function(weather) {
            city = weather.city;
            temp = weather.temp+'&deg;';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            humidity = weather.humidity + ' %';
            
            $(".location").text(city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
        },
        error: function() {
            $(".error").html('<p>' + loadDefaultLocation + '</p>');
        }
    });
};

function loadDefaultLocation() {
    loadWeather('London', '44418');
}