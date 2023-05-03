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
        attributionControl: false,
        zoomControl: false,
      }"
      :zoom="zoom"
      :center="[fiveoclocktimezone.lat - 4, fiveoclocktimezone.lon]"
      :use-global-leaflet="false"
    >
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
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
