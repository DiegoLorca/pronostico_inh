const options = {
    key: 'RYFkv5tPQWvs6VAEFnsTd0gUE4ooyFeH', // REPLACE WITH YOUR KEY !!!

    // Tip: Use verbose true for nice console output
    // verbose: true
    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: -33.0506882,
    lon: -71.6810887,
    zoom: 8,
};

windyInit(options, windyAPI => {
    const { store, map, picker, utils, broadcast } = windyAPI;
    // broadcast is main Windy's event emmiter that
    // let you know what is happening inside

    // Change overlays programatically
    const overlays = ['waves'];
    let i = 0;

    setInterval(() => {
        i = i === 3 ? 0 : i + 1;
        store.set('overlay', overlays[i]);
    }, 800);

    // Observe the most important broadcasts
    broadcast.on('paramsChanged', params => {
        console.log('Params changed:', params);
    });

    broadcast.on('redrawFinished', params => {
        console.log('Map was rendered:', params);
    });

    picker.on('pickerOpened', latLon => {
        // picker has been opened at latLon coords
        console.log(latLon);

        const { lat, lon, values, overlay } = picker.getParams();
        // -> 48.4, 14.3, [ U,V, ], 'wind'
        console.log(lat, lon, values, overlay);

        const windObject = utils.wind2obj(values);
        console.log(windObject);
    });

    picker.on('pickerMoved', latLon => {
        // picker was dragged by user to latLon coords
        console.log(latLon);
    });

    picker.on('pickerClosed', () => {
        // picker was closed
    });

    // Wait since wather is rendered
    broadcast.once('redrawFinished', () => {
        picker.open({ lat: -33.0506882, lon: -73.6810887 });
        // Opening of a picker (async)
    });

    L.popup()
        .setLatLng([-33.0506882, -71.6810887])
        .setContent('Valparaiso')
        .openOn(map);
});

// const options = {
//     key: 'RYFkv5tPQWvs6VAEFnsTd0gUE4ooyFeH', // REPLACE WITH YOUR KEY !!!
//     lat: -33.0506882,
//     lon: -71.6810887,
//     zoom: 5,
// };
//
// windyInit(options, windyAPI => {
//     const { picker, utils, broadcast } = windyAPI;
//
//     picker.on('pickerOpened', latLon => {
//         // picker has been opened at latLon coords
//         console.log(latLon);
//
//         const { lat, lon, values, overlay } = picker.getParams();
//         // -> 48.4, 14.3, [ U,V, ], 'wind'
//         console.log(lat, lon, values, overlay);
//
//         const windObject = utils.wind2obj(values);
//         console.log(windObject);
//     });
//
//     picker.on('pickerMoved', latLon => {
//         // picker was dragged by user to latLon coords
//         console.log(latLon);
//     });
//
//     picker.on('pickerClosed', () => {
//         // picker was closed
//     });
//
//     // Wait since wather is rendered
//     broadcast.once('redrawFinished', () => {
//         picker.open({ lat: -33.0506882, lon: -73.6810887 });
//         // Opening of a picker (async)
//     });
// });
