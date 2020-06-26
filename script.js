const options = {
    // Required: API key
    key: 'RYFkv5tPQWvs6VAEFnsTd0gUE4ooyFeH', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: -33.0506882,
    lon: -71.6810887,
    zoom: 8,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    L.popup()
        .setLatLng([-33.0506882, -71.6810887])
        .setContent('Valparaiso')
        .openOn(map);
});
