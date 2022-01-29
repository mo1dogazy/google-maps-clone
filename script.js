mapboxgl.accessToken =
  "pk.eyJ1IjoibW9sZG9nYXp5IiwiYSI6ImNreHBhZjViczJkbGsycnBldWN6cWJ6engifQ.Se8VP-hw4x13p69IDwrJuQ";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([-2.24, 53.47]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 14,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, "top-left");

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    profile: "mapbox/cycling",
  });

  map.addControl(directions, "top-left");
}

//  Map2
/*============================================================*/

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9sZG9nYXp5IiwiYSI6ImNreHBhZjViczJkbGsycnBldWN6cWJ6engifQ.Se8VP-hw4x13p69IDwrJuQ";
const map2 = new mapboxgl.Map({
  container: "map2",
  zoom: 14.77,
  center: [127.60597, 35.67283],
  pitch: 83,
  style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
});

map2.on("load", () => {
  map2.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    tileSize: 512,
    maxzoom: 14,
  });
  map2.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

  map2.addLayer({
    id: "sky",
    type: "sky",
    paint: {
      // set up the sky layer to use a color gradient
      "sky-type": "gradient",
      // the sky will be lightest in the center and get darker moving radially outward
      // this simulates the look of the sun just below the horizon
      "sky-gradient": [
        "interpolate",
        ["linear"],
        ["sky-radial-progress"],
        0.8,
        "rgba(135, 206, 235, 1.0)",
        1,
        "rgba(0,0,0,0.1)",
      ],
      "sky-gradient-center": [0, 0],
      "sky-gradient-radius": 90,
      "sky-opacity": [
        "interpolate",
        ["exponential", 0.1],
        ["zoom"],
        5,
        0,
        22,
        1,
      ],
    },
  });
});

// Map3
/*======================================================================*/

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9sZG9nYXp5IiwiYSI6ImNreHBhZjViczJkbGsycnBldWN6cWJ6engifQ.Se8VP-hw4x13p69IDwrJuQ";
const map3 = new mapboxgl.Map({
  container: "map3",
  zoom: 13.5,
  pitch: 85,
  bearing: 70,
  center: [-119.53543366513888, 37.74467518164313],
  style: "mapbox://styles/mapbox-map-design/ckvinefga12gk14o2zxwo0721",
});

map3.on("load", () => {
  // Extract JSON representation of an existing layer
  const layer = map3
    .getStyle()
    .layers.find((layer) => layer.id === "natural-point-label");
  // Add in a pitch condition to the existing layers filter
  // so that it only renders when the pitch is low
  const lowPitchFilter = ["all", layer.filter, ["<", ["pitch"], 60]];
  map3.setFilter("natural-point-label", lowPitchFilter);

  // Add in styling for leader lines into the layer
  layer.id = "natural-point-label-elevated";
  // Add a leader line using `icon-image`
  layer.layout["icon-image"] = "leader_line";
  layer.layout["icon-anchor"] = "bottom";
  // Elevate the text using text-offset
  layer.layout["text-offset"] = [0, -12.5];
  // Set the filter to only render at high pitch
  const highPitchFilter = ["all", layer.filter, [">=", ["pitch"], 60]];
  layer.filter = highPitchFilter;

  // Add in a new layer with the updated styling
  map3.addLayer(layer, "natural-point-label");
});
