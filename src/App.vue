<script lang="ts">
import "leaflet/dist/leaflet.css";

import cities from "@/assets/timezones.json";

import moment from "moment-timezone";

import BackgroundMap from "@/components/BackgroundMap.vue";

type City = {
  city: string;
  lat: number;
  lon: number;
  country: string;
  timezone: string;
};

const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

let timezones: City[] = [];

let debug = [];

for (let index = 0; index < cities.length; index++) {
  const city = cities[index];

  moment().tz(city.timezone).hour() === 17 && timezones.push(city);

  debug.push({
    city: city.city,
    hour: moment().tz(city.timezone).hour(),
    timezone: city.timezone,
  });
}

console.log(debug.sort((a, b) => a.hour - b.hour));

shuffleArray(timezones);

if (timezones.length > 0) {
  var fiveoclocktimezone = timezones[0];
} else {
  var fiveoclocktimezone = {
    city: "Nowhere",
    lat: 0,
    lon: 0,
    country: "Nowhere",
    timezone: "Nowhere",
  };
}

export default {
  components: {
    BackgroundMap,
  },
  data() {
    return {
      fiveoclocktimezone,
    };
  },
};
</script>

<template>
  <BackgroundMap :fiveoclocktimezone="fiveoclocktimezone" :zoom="5" />
  <div class="textContainer">
    <div style="text-align: center; text-wrap: balance; user-select: none">
      It's five o'clock in
    </div>
    <div style="color: white; font-size: xx-large">
      {{ fiveoclocktimezone.city }}
    </div>
  </div>
</template>

<style scoped>
.textContainer {
  height: 100vh;
  width: 100vw;
  position: absolute;
  color: gray;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-items: center;
  justify-content: center;
  font-size: x-large;
}
</style>
