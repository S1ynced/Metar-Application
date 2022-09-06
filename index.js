//Detecting Keyboard Press
document.addEventListener("keydown", function (event) {
  var keypress = event.key;
  // console.log(keypress);
});

//Departure ICAO Data
document
  .querySelector(".departure-icao")
  .addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      var departureICAO = document.querySelector(".departure-icao").value;

      var departureRequest = new XMLHttpRequest();

      departureRequest.open(
        "GET",
        "https://avwx.rest/api/metar/" + departureICAO
      );
      departureRequest.setRequestHeader(
        "Authorization",
        "mVEOR08C0BsCUUNRDTfa69FSTeDZxopN5no8xyqLHks"
      );

      departureRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log("Status:", this.status);
          console.log("Headers:", this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
        }
      };

      departureRequest.onload = () => {
        const data = JSON.parse(departureRequest.response);
        console.log(data);

        document.querySelector(".departure-air-pressure-data").innerHTML =
          data.altimeter.value + " " + data.units.altimeter;
        document.querySelector(".departure-wind-speed-data").innerHTML =
          data.wind_direction.repr +
          " / " +
          data.wind_speed.value +
          " " +
          data.units.wind_speed +
          "s";
        document.querySelector(".departure-temperature-data").innerHTML =
          data.temperature.value + "°" + data.units.temperature;
        document.querySelector(".departure-dew-point-data").innerHTML =
          data.dewpoint.value + "°" + data.units.temperature;
      };
      departureRequest.send();
    } else console.log(event.keyCode);
  });

//ARRIVAL ICAO DATA
document
  .querySelector(".arrival-icao")
  .addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      var arrivalICAO = document.querySelector(".arrival-icao").value;

      var arrivalRequest = new XMLHttpRequest();

      arrivalRequest.open("GET", "https://avwx.rest/api/metar/" + arrivalICAO);
      arrivalRequest.setRequestHeader(
        "Authorization",
        "mVEOR08C0BsCUUNRDTfa69FSTeDZxopN5no8xyqLHks"
      );

      arrivalRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log("Status:", this.status);
          console.log("Headers:", this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
        }
      };

      arrivalRequest.onload = () => {
        const data = JSON.parse(arrivalRequest.response);
        console.log(data);

        document.querySelector(".arrival-air-pressure-data").innerHTML =
          data.altimeter.value + " " + data.units.altimeter;
        document.querySelector(".arrival-wind-speed-data").innerHTML =
          data.wind_direction.repr +
          " / " +
          data.wind_speed.value +
          " " +
          data.units.wind_speed +
          "s";
        document.querySelector(".arrival-temperature-data").innerHTML =
          data.temperature.value + "°" + data.units.temperature;
        document.querySelector(".arrival-dew-point-data").innerHTML =
          data.dewpoint.value + "°" + data.units.temperature;
      };
      arrivalRequest.send();
    } else console.log(event.keyCode);
  });
