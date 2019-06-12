new Vue({
    el: '#app',
    data: {
        aMarkerArea: null,
        aCoord: null,
        layers: [{
                id: 0,
                name: 'Bogart\'s Smokehouse',
                type: 'marker',
                coords: [45.456789, 4.391441],
                // coords: [45.4560, 4.3980],
            },
            {
                id: 1,
                name: 'Pappy\'s Smokehouse',
                type: 'marker',
                coords: [45.456500, 4.399800],
                color: 'blue',
            },
            {
                id: 2,
                name: 'Broadway Oyster Bar',
                type: 'marker',
                coords: [45.456523, 4.398881],
                color: 'blue',
            },
            {
                id: 3,
                name: 'Charlie Gitto\'s On the Hill',
                type: 'marker',
                coords: [45.453722, 4.396591],
                color: 'blue',
            },
            {
                id: 4,
                name: 'Sugarfire',
                type: 'marker',
                coords: [45.458688, 4.39436],
                color: 'blue',
            },
            {
                id: 5,
                name: 'The Shaved Duck',
                type: 'marker',
                coords: [45.459831, 4.384232],
                color: 'blue',
            },
            {
                id: 6,
                name: 'Mango Restaurant',
                type: 'marker',
                coords: [45.459921, 4.402685],
                color: 'blue',
            },
            {
                id: 7,
                name: 'Zia\'s Restaurant',
                type: 'marker',
                coords: [45.45315, 4.387364],
                color: 'blue',
            },
            {
                id: 8,
                name: 'Anthonio\'s Taverna',
                type: 'marker',
                coords: [45.455678, 4.390197],
                color: 'blue',
            },
        ],

    },
    mounted() {
        this.loadLeaflet()
        // , this.initLayers()
    },
    methods: {
        loadLeaflet() {

            // Center of the map
            var center = [45.456789, 4.391441];

            // Create the map
            var map = L.map('map').setView(center, 15);

            // Set up the OSM layer
            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                    maxZoom: 17
                }).addTo(map);

            // add a marker in the given location
            // L.marker(center).addTo(map);

            this.layers.forEach((layer) => {
                L.marker(layer.coords).addTo(map);
            })

            // Initialise the FeatureGroup to store editable layers
            var editableLayers = new L.FeatureGroup();
            map.addLayer(editableLayers);

            var drawPluginOptions = {
                position: 'topright',
                draw: {
                    polygon: {
                        allowIntersection: false, // Restricts shapes to simple polygons
                        drawError: {
                            color: '#e1e100', // Color the shape will turn when intersects
                            message: '<strong>Erreur !<strong>' // Message that will show when intersect
                        },
                        shapeOptions: {
                            color: '#97009c'
                        }
                    },
                    // disable toolbar item by setting it to false
                    polyline: false, // Turns off this drawing tool
                    circle: {},
                    rectangle: false,
                    marker: {},
                    circlemarker: false,
                },

            };

            // Initialise the draw control and pass it the FeatureGroup of editable layers
            var drawControl = new L.Control.Draw(drawPluginOptions);
            map.addControl(drawControl);

            var layers = this.layers;

            map.on('draw:created', function (e) {
                // debugger;
                var type = e.layerType,
                    layer = e.layer;

                // debugger;
                if (type === 'marker') {
                    console.log(layer);
                    layer.bindPopup(layer._latlngs);
                }
                if (type === 'polygon') {

                    // console.log(e.layer._latlngs[0]);
                    var aMarkerArea = e.layer._latlngs[0];
                    
                    for (let i = 0; i < aMarkerArea.length; i++) {
                        aMarkerArea[i].lat = nArrondi(aMarkerArea[i].lat);
                        aMarkerArea[i].lng = nArrondi(aMarkerArea[i].lng);
                    }
                    // console.log(aMarkerArea);

                    var oCoordMinMax = calculMinMax(aMarkerArea);

                    layers.forEach((layer) => {
                        sLatitude = layer.coords[0];
                        sLongitude = layer.coords[1];
                        var bValide = false;

                        // console.log(oCoordMinMax.lat.min.deg, sLatitude, oCoordMinMax.lat.max.deg, sLatitude);
                        if (oCoordMinMax.lat.min.deg < sLatitude && oCoordMinMax.lat.max.deg > sLatitude) {

                            // console.log(oCoordMinMax.lng.min.deg, sLongitude, oCoordMinMax.lng.max.deg, sLongitude);
                            if (oCoordMinMax.lng.min.deg < sLongitude && oCoordMinMax.lng.max.deg > sLongitude) {
                                bValide = true;
                            }
                        }

                        var greenIcon = new L.Icon({
                            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });
                        var redIcon = new L.Icon({
                            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });


                        var aLineArea = aCreateLineArea(aMarkerArea);

                        var aListPointLat = [];
                        var aListPointLng = [];

                        aLineArea.forEach((aCoord) => {

                            var oLineMinMax = calculMinMax(aCoord);

                            if (oLineMinMax.lat.min.deg < sLatitude && sLatitude < oLineMinMax.lat.max.deg) {
                                var aInterPointLat = calculPointIntersectionLatitude(aCoord, sLatitude);
                                aListPointLng.push(aInterPointLat[0].lng);
                            }
                            if (oLineMinMax.lng.min.deg < sLongitude && sLongitude < oLineMinMax.lng.max.deg) {
                                var aInterPointLng = calculPointIntersectionLongitude(aCoord, sLongitude);
                                aListPointLat.push(aInterPointLng[0].lat);
                            }

                        });

                        console.log(aListPointLat);
                        console.log(aListPointLng);

                        //TODO Revoir le tri par ordre croissant
                        aListPointLat.sort(function (a1, b1) {
                            return a1 - b1;
                        });
                        aListPointLng.sort(function (a2, b2) {
                            return a2 - b2;
                        });

                        console.log(aListPointLat);
                        console.log(aListPointLng);
                        
                        var aListPointLat = aCreateLine(aListPointLat);
                        var aListPointLng = aCreateLine(aListPointLng);
                        
                        //TODO acceder aux array aListPointLat et aListePointLng

                        console.log(aListPointLat);
                        console.log(aListPointLng);

                        bValide = false;
                        if (bCheckIsLatInArea(aListPointLat, sLatitude) && bCheckIsLngInArea(aListPointLng, sLongitude)) {
                            bValide = true;
                        }

                        var sColorIcon = (bValide) ? greenIcon : redIcon;
                        L.marker(layer.coords, {
                            icon: sColorIcon
                        }).bindPopup(layer.id.toString()).addTo(map);
                    });

                }

                editableLayers.addLayer(layer);

            });

            //////////////////////
            // Methodes utiles
            //////////////////////

            function calculMinMax(arr) {
                let minLat = arr[0].lat;
                let maxLat = arr[0].lat;
                let indexLatMin = 0;
                let indexLatMax = 0;

                for (let i = 1, len = arr.length; i < len; i++) {
                    let v = arr[i].lat;
                    if (v < minLat) {
                        minLat = v;
                        indexLatMin = i;
                    }
                    if (v > maxLat) {
                        maxLat = v
                        indexLatMax = i;
                    }
                }

                let minLng = arr[0].lng;
                let maxLng = arr[0].lng;
                let indexLngMin = 0;
                let indexLngMax = 0;

                for (let i = 1, len = arr.length; i < len; i++) {
                    let v = arr[i].lng;
                    if (v < minLng) {
                        minLng = v;
                        indexLngMin = i;
                    }
                    if (v > maxLng) {
                        maxLng = v
                        indexLngMax = i;
                    }
                }

                return {
                    lat: {
                        min: {
                            index: indexLatMin,
                            deg: minLat
                        },
                        max: {
                            index: indexLatMax,
                            deg: maxLat
                        }
                    },

                    lng: {
                        min: {
                            index: indexLngMin,
                            deg: minLng
                        },
                        max: {
                            index: indexLngMax,
                            deg: maxLng
                        }
                    }

                };
            };

            function aCreateLineArea(aMarkerArea) {

                var aLine = [];
                var a2Coord = [];
                var aLineArea = [];
                var iMax = aMarkerArea.length - 1;
                for (let i = 0; i < aMarkerArea.length; i++) {
                    if (i == 0) {
                        aLine.push(aMarkerArea[iMax]);
                    }
                    aLine.push(aMarkerArea[i]);
                    if (aLine.length == 2) {
                        aLine.forEach((layer) => {
                            // L.marker(layer).addTo(map);
                            a2Coord.push(layer);
                        });
                        aLine.shift();
                        aLineArea.push(a2Coord);
                        a2Coord = [];
                    }
                };

                return aLineArea;
            };

            function aCreateLine(aListPoint) {

                var aLine = [];
                var a2Coord = [];
                var aMultiLine = [];
                for (let i = 0; i < aListPoint.length; i++) {
                    
                    aLine.push(aListPoint[i]);
                    if (aLine.length == 2) {
                        console.log(aLine);
                        
                        aLine.forEach((layer) => {
                            console.log(layer);
                            // L.marker(layer).addTo(map);
                            a2Coord.push(layer);
                        });
                        aLine.shift();
                        console.log(a2Coord);
                        aMultiLine.push(a2Coord);
                        a2Coord = [];
                    }
                };

                return aMultiLine;
            };

            function bCheckIsLngInArea(aListPoint, sLongitude) {

                var bValide = false;
                for (let i = 0; i < aListPoint.length; i++) {
                    console.log(i % 2 === 0);
                    
                    const aPoint = aListPoint[i];
                    
                    console.log(aPoint[0]);
                    
                    if (i % 2 === 0) {
                        console.log(aPoint[0] , sLongitude, aPoint[1]);
                        
                        if (aPoint[0] <= sLongitude && sLongitude <= aPoint[1]) {
                            
                            console.log(sLongitude, 'pair', aPoint[0]);
                            bValide = true;
                        }
                    } 
                }
                return bValide;
            };

            function bCheckIsLatInArea(aListPoint, sLatitude) {

                var bValide = false;
                for (let i = 0; i < aListPoint.length; i++) {
                    console.log(aListPoint);
                    
                    const aPoint = aListPoint[i];
                    
                    console.log(aPoint);
                    
                    if (i % 2 === 0) {
                        console.log(aPoint[0] , sLatitude, aPoint[1]);
                        
                        if (aPoint[0] <= sLatitude && sLatitude <= aPoint[1]) {
                            
                            console.log(sLatitude, 'pair', aPoint[0]);
                            bValide = true;
                        }
                    } 
                    
                }
                return bValide;
            };

            function nArrondi(nb, pre = 6) {
                return Number.parseFloat(nb).toFixed(pre);
            }

            Number.prototype.toRadians = function () {
                return this * Math.PI / 180;
            }

            Number.prototype.toDeg = function () {
                return this * 180 / Math.PI;
            }

            function calculPointIntersectionLatitude(aCoord, sLatitude) {

                // console.log(aCoord);
                
                var lat1 = parseFloat(aCoord[0].lat).toRadians();
                var lon1 = parseFloat(aCoord[0].lng).toRadians();
                var lat2 = parseFloat(aCoord[1].lat).toRadians();
                var lon2 = parseFloat(aCoord[1].lng).toRadians();
                var lat = parseFloat(sLatitude).toRadians();
                // (111 degrees = 1.937315 radians)

                var lon = Math.atan((Math.sin(lon1) * Math.cos(lon2) * Math.sin(lat - lat2) - Math.sin(lon2) * Math.cos(lon1) * Math.sin(lat - lat1)) / (Math.cos(lon1) * Math.cos(lon2) * Math.sin(lat1 - lat2)));

                return [{
                    lat: parseFloat(nArrondi(lat.toDeg())),
                    lng: parseFloat(nArrondi(lon.toDeg()))
                }];
                
            };

            function calculPointIntersectionLongitude(aCoord, sLongitude) {

                // console.log(aCoord);
                
                var lat1 = parseFloat(aCoord[0].lat).toRadians();
                var lon1 = parseFloat(aCoord[0].lng).toRadians();
                var lat2 = parseFloat(aCoord[1].lat).toRadians();
                var lon2 = parseFloat(aCoord[1].lng).toRadians();
                var lon = parseFloat(sLongitude).toRadians();
                // (111 degrees = 1.937315 radians)

                var lat = Math.atan((Math.sin(lat1) * Math.cos(lat2) * Math.sin(lon - lon2) - Math.sin(lat2) * Math.cos(lat1) * Math.sin(lon - lon1)) / (Math.cos(lat1) * Math.cos(lat2) * Math.sin(lon1 - lon2)));

                return [{
                    lat: parseFloat(nArrondi(lat.toDeg())),
                    lng: parseFloat(nArrondi(lon.toDeg()))
                }];
               
            };

        },
        initLayers() {},

    }
})