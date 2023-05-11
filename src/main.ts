import { createApp } from "vue";
import App from "./App.vue";

import { ApplicationInsights } from "@microsoft/applicationinsights-web";

import "normalize.css";

const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      "InstrumentationKey=98879211-89a3-48c1-9119-007171bc63f8;IngestionEndpoint=https://northeurope-2.in.applicationinsights.azure.com/;LiveEndpoint=https://northeurope.livediagnostics.monitor.azure.com/",
  },
});
appInsights.loadAppInsights();
appInsights.trackPageView();

createApp(App).mount("#app");
