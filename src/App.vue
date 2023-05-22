<script lang="ts">
import "leaflet/dist/leaflet.css";
import "flag-icons/css/flag-icons.min.css";

import cities from "@/assets/timezones.json";

import moment from "moment-timezone";
import * as isoCountries from "i18n-iso-countries";
import * as enLang from "i18n-iso-countries/langs/en.json";

import BackgroundMap from "@/components/BackgroundMap.vue";

isoCountries.registerLocale(enLang);

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

for (let index = 0; index < cities.length; index++) {
  const city = cities[index];

  moment().tz(city.timezone).hour() === 17 && timezones.push(city);
}

shuffleArray(timezones);

if (timezones.length > 0) {
  var fiveoclocktimezone = timezones[0];
  var country = isoCountries.getName(fiveoclocktimezone.country, "en", {
    select: "official",
  });
  console.log(country);
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
      country,
      fiveoclocktimezone,
    };
  },
};
</script>

<template>
  <BackgroundMap :fiveoclocktimezone="fiveoclocktimezone" :zoom="5" />
  <div class="textContainer">
    <div
      style="
        text-align: center;
        text-wrap: balance;
        user-select: none;
        color: #94a3b8;
      "
    >
      It's five o'clock in
    </div>
    <div style="color: #f1f5f9; font-size: xx-large">
      {{ fiveoclocktimezone.city }}
    </div>

    <div v-if="country" style="color: #e2e8f0; font-size: x-large">
      <i :class="`fi fi-${fiveoclocktimezone.country.toLowerCase()}`"></i>
      {{ country }}
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
  font-family: "Roboto Mono", monospace;
}
</style>
