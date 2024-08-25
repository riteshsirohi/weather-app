import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=664deac07c99359794f4b88e24290e15`
      );

      const data = await response.json();
      if (data) {
        setWeather(data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  async function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  useEffect(() => {
    fetchWeatherData("mumbai");
  }, []);

  console.log(weather);
  console.log(loading);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weather?.name}, <span>{weather?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{(weather?.main?.temp-273.15).toFixed(1)}</div>
          <p className="description">{weather?.weather[0]?.description}</p>
          <div className="weather-info">
            <div>
              <div>
                <p>Wind speed</p>
                <p className="wind">{weather?.wind?.speed}</p>
              </div>
            </div>  
          </div>
        </div>
      )}
    </div>
  );
}
