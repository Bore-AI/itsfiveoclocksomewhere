<script setup lang="ts">
import "leaflet/dist/leaflet.css";

import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";

type City = {
  city: string;
  lat: number;
  lon: number;
  country: string;
  timezone: string;
};

defineProps<{
  fiveoclocktimezone: City;
  zoom: number;
}>();
</script>

<template>
  <div class="mapContainer">
    <l-map
      ref="map"
      :options="{
        zoomControl: false,
      }"
      :zoom="zoom"
      :center="[fiveoclocktimezone.lat - 4, fiveoclocktimezone.lon]"
      :use-global-leaflet="false"
    >
      <l-tile-layer
        :url="`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}{r}?access_token=pk.eyJ1IjoiaG92ZWRib3JlbiIsImEiOiJjbGg3cWNya20wMTU2M2xqZzFuZGluMmJvIn0.-O90x0O080LRyxFWMRob2Q`"
        attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker :lat-lng="[fiveoclocktimezone.lat, fiveoclocktimezone.lon]" />
    </l-map>
  </div>
</template>

<style scoped>
.mapContainer {
  height: 100vh;
  width: 100vw;
  position: absolute;
  opacity: 0.4;
}
</style>
