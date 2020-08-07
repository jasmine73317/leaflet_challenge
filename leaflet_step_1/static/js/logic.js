var myMap = L.map("map", {
    center:[40, -80],
    zoom: 3
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "sk.eyJ1IjoiamFzbWluZTMxNyIsImEiOiJja2JudGh4cmYwZXAyMzBsM2R0dHZmaXQzIn0.VYRjdunvF9ZFyaFWvAFelg"
}).addTo(myMap);

function colors(magnitude) {
    
    switch(true){
        case magnitude < 1:
            return "#E6E6FA";
        case magnitude < 2:
            return "#D8BFD8";
        case magnitude < 3:
            return "#DDA0DD";
        case magnitude < 4:
            return "#DA70D6";
        case magnitude < 5:
            return "#FF00FF";
        case magnitude < 6:
            return "#BA55D3";
        case magnitude < 7:
            return "#9932CC";
        case magnitude < 8:
            return "#8A2BE2";
        case magnitude < 9:
            return "#663399";
        case magnitude <=10:
            return "#4B0082";
        default:
            return "#FFEFD5";

    }
};

function sizes(magnitude){
    switch(true){
        case magnitude < 1:
            return 5;
        case magnitude < 2:
            return 8;
        case magnitude < 3:
            return 11;
        case magnitude < 4:
            return 14;
        case magnitude < 5:
            return 17;
        case magnitude < 6:
            return 20;
        case magnitude < 7:
            return 23;
        case magnitude < 8:
            return 26;
        case magnitude < 9:
            return 29;
        case magnitude <= 10:
            return 32;
        default:
            return 5;
    }
};

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latLon) {
            return L.circleMarker(latLon, {
                radius: sizes(feature.properties.mag),
                color: colors(feature.properties.mag),
                // color: "#DA70D6",
                weight: 0.6,
                Opacity: 1,
                fillOpacity:0.8
            });   
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h2>${feature.properties.place}</h2><hr><h3>magnitude: ${feature.properties.mag}</h3>`)

        }
    }).addTo(myMap);
});
