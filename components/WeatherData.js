import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { FlatList, SafeAreaView } from "react-native";

export default function WeatherData({ weeklyWeather, city }) {
  const { daily } = weeklyWeather;
  const { name } = city;
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const DATA = daily;

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={styles.icon}
        source={{
          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
        }}
      />
      <Text style={styles.type}>
        {days[(Math.floor(item.dt / 86400) + 4) % 7]}
        {"\n"}&nbsp;{item.weather[0].main}{" "}
      </Text>
      <Text style={styles.temp}>
        &nbsp;
        {parseFloat(item.temp.day - 273.15).toFixed(0)}&deg;C
      </Text>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.city}>{name}</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.dt}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    textAlign: "center",
    fontSize: 32,
    color: "black",
    marginTop:50,
  },
  type: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    justifyContent:"space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8cb3ff",
    padding: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 3,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  temp: {
    fontSize: 24,
  },
  icon: {
    width: 100,
    height: 100,
  },
});
