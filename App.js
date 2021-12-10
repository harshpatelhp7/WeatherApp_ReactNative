import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Location from "expo-location";
import WeatherData from "./components/WeatherData";

const API_KEY = "db6e47f051cfa2045c8c2ae9b8e75418";
const BASE_WEATHER_ONECALLAPI_URL = `https://api.openweathermap.org/data/2.5/onecall?`;
const BASE_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?`;

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);
  const [city, setCity] = useState("null");

  useEffect(() => {
    initialRun();
  }, []);

  async function initialRun() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied.");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_ONECALLAPI_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
      const cityUrl = `${BASE_WEATHER_API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      const response = await fetch(weatherUrl);
      const res2 = await fetch(cityUrl);

      const result = await response.json();
      const result4Ct = await res2.json();
      if (response.ok && res2.ok) {
        setWeeklyWeather(result);
        setCity(result4Ct);
      } else {
        setErrorMessage("Oops, not able to Fetch Weather at this time. Sorry!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (weeklyWeather) {
    let props = {
      weeklyWeather,
      city,
    };
    return (
      <View style={styles.container}>
        <WeatherData {...props} />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 50,
    width: 200,
    borderColor: "green",
  },
});
