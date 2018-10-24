<!--
var stops = {}

stops["place-sstat"] = {
    name: "South Station",
    loc: {lat: 42.352271, lng: -71.05524200000001},
    id: "place-sstat"
}
stops["place-andrw"] = {
    name: "Andrew",
    loc: {lat: 42.330154, lng: -71.057655},
    id: "place-andrw"
}
stops["place-portr"] = {
    name: "Porter Square",
    loc: {lat: 42.3884, lng: -71.11914899999999},
    id: "place-portr"
}
stops["place-harsq"] = {
    name: "Harvard Square",
    loc: {lat: 42.373362, lng: -71.118956},
    id: "place-harsq"
}
stops["place-jfk"] = {
    name: "JFK/UMass",
    loc: {lat: 42.320685, lng: -71.052391},
    id: "place-jfk"
}
stops["place-shmnl"] = {
    name: "Savin Hill",
    loc: {lat: 42.31129, lng: -71.053331},
    id: "place-shmnl"
}
stops["place-pktrm"] = {
    name: "Park Street",
    loc: {lat: 42.35639457, lng: -71.0624242},
    id: "place-pktrm"
}
stops["place-brdwy"] = {
    name: "Broadway",
    loc: {lat: 42.342622, lng: -71.056967},
    id: "place-brdwy"
}
stops["place-nqncy"] = {
    name: "North Quincy",
    loc: {lat: 42.275275, lng: -71.029583},
    id: "place-nqncy"
}
stops["place-smmnl"] = {
    name: "Shawmut",
    loc: {lat: 42.29312583, lng: -71.06573796000001},
    id: "place-smmnl"
}
stops["place-davis"] = {
    name: "Davis",
    loc: {lat: 42.39674, lng: -71.121815},
    id: "place-davis"
}
stops["place-alfcl"] = {
    name: "Alewife",
    loc: {lat: 42.395428, lng: -71.142483},
    id: "place-alfcl"
}
stops["place-knncl"] = {
    name: "Kendall/MIT",
    loc: {lat: 42.36249079, lng: -71.08617653},
    id: "place-knncl"
}
stops["place-chmnl"] = {
    name: "Charles/MGH",
    loc: {lat: 42.361166, lng: -71.070628},
    id: "place-chmnl"
}
stops["place-dwnxg"] = {
    name: "Downtown Crossing",
    loc: {lat: 42.355518, lng: -71.060225},
    id: "place-dwnxg"
}
stops["place-qnctr"] = {
    name: "Quincy Center",
    loc: {lat: 42.251809, lng: -71.005409},
    id: "place-qnctr"
}
stops["place-qamnl"] = {
    name: "Quincy Adams",
    loc: {lat: 42.233391, lng: -71.007153},
    id: "place-qamnl"
}
stops["place-asmnl"] = {
    name: "Ashmont",
    loc: {lat: 42.284652, lng: -71.06448899999999},
    id: "place-asmnl"
}
stops["place-wlsta"] = {
    name: "Wollaston",
    loc: {lat: 42.2665139, lng: -71.0203369},
    id: "place-wlsta"
}
stops["place-fldcr"] = {
    name: "Fields Corner",
    loc: {lat: 42.300093, lng: -71.061667},
    id: "place-fldcr"
}
stops["place-cntsq"] = {
    name: "Central Square",
    loc: {lat: 42.365486, lng: -71.103802},
    id: "place-cntsq"
}
stops["place-brntn"] = {
    name: "Braintree",
    loc: {lat: 42.2078543, lng: -71.0011385},
    id: "place-brntn"
}

var map;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.352271, lng: -71.05524200000001},
        zoom: 12
    });
    
    // Hiding markers code is from https://stackoverflow.com/questions/50064511/hide-points-of-interest-google-maps-except-my-location
    var noPoi = [{
        featureType: "poi",
        elementType: "labels",

        stylers: [{
            visibility: "off"
        }]
    }];

    map.setOptions({
        styles: noPoi
    });
    
    info = new google.maps.InfoWindow({
                content: "<p>Loading...</p>"
    });
    var iconDumb = 'station.png';
    for (stop in stops){
        stops[stop].marker = new google.maps.Marker({position: stops[stop].loc, map:     map, icon: iconDumb});
        stops[stop].marker.id = stops[stop].id;
        stops[stop].marker.addListener('click', function() {
            info.setContent("<p>Loading...</p>");

            makeRequest(this.id);
            info.open(map, this);
        });
        
    }

    var firstline = new google.maps.Polyline({
        path: [
            stops["place-alfcl"].loc, stops["place-davis"].loc,
            stops["place-portr"].loc, stops["place-harsq"].loc,
            stops["place-cntsq"].loc, stops["place-knncl"].loc,
            stops["place-chmnl"].loc, stops["place-pktrm"].loc, 
            stops["place-dwnxg"].loc, stops["place-sstat"].loc, 
            stops["place-brdwy"].loc, stops["place-andrw"].loc, 
            stops["place-jfk"].loc, stops["place-nqncy"].loc, 
            stops["place-wlsta"].loc, stops["place-qnctr"].loc, 
            stops["place-qamnl"].loc, stops["place-brntn"].loc
        ],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 4
    });
    firstline.setMap(map);

    var otherline = new google.maps.Polyline({
        path: [
            stops["place-jfk"].loc, stops["place-shmnl"].loc, 
            stops["place-fldcr"].loc, stops["place-smmnl"].loc, 
            stops["place-asmnl"].loc
        ],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 4
    });
    otherline.setMap(map);
    
    
    // Geolocating
    if (navigator.geolocation) {
        //setInterval(function(){ // Keeps asking for position
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            // Find nearest stop
            var shortest = 800;
            var nearest = stops["place-sstat"];
            for (stop in stops)
            {
                var loc = (stops[stop].loc);
                var dist = Math.sqrt(Math.pow(pos.lat - loc.lat, 2) + Math.pow(pos.lng - loc.lng, 2));
                if (dist < shortest){
                    shortest = dist;
                    nearest = stops[stop];
                }
            }
            map.setCenter(pos);
            
            // Add line to nearest station
            var nearline = new google.maps.Polyline({
                path: [pos, nearest.loc],
                geodesic: true,
                strokeColor: '#555555',
                strokeOpacity: 1.0,
                strokeWeight: 6
            });
            nearline.setMap(map);
            var marker = new google.maps.Marker({position: pos, map: map});
            
            // Add info window
            var contentString = '<div id="content">'+
            '<div id="youarehere">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">You are here</h1>'+
            '<div id="bodyContent">'+
            '<p>Nearest station: ' +
            nearest.name +
            '</p>'+
            '</div>'+
            '</div>';

            var yourinfo = new google.maps.InfoWindow({
                content: contentString
            });

            
            marker.addListener('click', function() {
                yourinfo.open(map, marker);
            });
          }, function() {
          });
        //} , 10000);
    }
}

function makeRequest(id){
    var request = new XMLHttpRequest();
    request.id = id;
    request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + id, true);
    
    request.onreadystatechange = function(){
        if (request.readyState == 4){
             schedule = JSON.parse(this.responseText);
            info.setContent('<div id="content">'+
            '<div id="station">'+
            '<h1 id="firstHeading" class="firstHeading">' + stops[this.id].name + '</h1>'+
            '<div id="bodyContent">');

            for (num in schedule.data)
            {
                var attributes = schedule.data[num].attributes;
                var time = attributes.arrival_time.substring(11, 19);
                var dir = (attributes.direction_id) ? "Northbound: " : "Southbound: ";   
                info.setContent(info.content + "<p>" + dir + time + "</p>");
            }
            
            info.setContent(info.content + '</div></div>');
        }
    }   
    request.send();
}

makeRequest("place-sstat");