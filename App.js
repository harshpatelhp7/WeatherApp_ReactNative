import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

const API_KEY = "8349ba0aa4ad1047dfa252615610a0eb";
const BASE_WEATHER_ONECALLAPI_URL = `https://api.openweathermap.org/data/2.5/onecall?`;

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied.");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      console.log(latitude + " " + longitude)
      const weatherUrl = `${BASE_WEATHER_ONECALLAPI_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      const response = await fetch(weatherUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage("Not valid weather call");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (currentWeather) {
    const {
      current: { temp, feels_like },
    } = currentWeather;
    return (
      <View style={styles.container}>
        <Text>
          {" "}
          {parseFloat(temp - 273.15).toFixed(1)}
          &deg;C{" "}
        </Text>
        <Text>
          Feels Like &nbsp;
          {parseFloat(feels_like - 273.15).toFixed(1)}
          &deg;C
        </Text>
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
    backgroundColor: "#4287f5",
    alignItems: "center",
    justifyContent: "center",
  },
});
