/* 
Created by: 
Abram Perdanaputra 13516083
Senapati Sang Diwangkara 13516107
 */

 /* HTML Elements */
 edgeList = $("#edge-list")
 vertexList = $("#vertex-list")
 startVertexPicker = $("#start-select")
 endVertexPicker = $("#end-select")
 submitButton = $("#submit")
 resetButton = $("#reset")

/* Map Algorithms */

var map;
var labelIndex = 0;
var markers = [];
var polylines = [];
var shortestPath = null;
var currentMarker = null;
var adjacencyMatrix = {};
var distanceMatrix = {};

function initMap() {
  var itbPos = {lat: -6.89148, lng: 107.6106591};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: itbPos,
    styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8ec3b9"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6f9ba5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3C7680"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2c6675"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#255763"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b0d5ce"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3a4762"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#0e1626"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#4e6d70"
            }
          ]
        }
      ]
  });

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
    currentMarker = null;
  });
}

function getUniqueLabel() {
  return (labelIndex++);
}

function addMarker(location, map) {
  var label = getUniqueLabel();
  var marker = new google.maps.Marker({
    position: location,
    label: label.toString(),
    map: map
  });

  marker.addListener('click', function(event) {
    if (currentMarker != null && currentMarker != marker) {
      createEdge(currentMarker, marker);
      currentMarker = null;
    } else {
      currentMarker = marker;
    }
    toggleBounce(marker)
    disableAnimation();
  });

  markers.push({
    marker: marker,
    data: {
      position: marker['position'],
      label: label
    }
  });

  updateVertexList();
  updateVertexPicker();
}

function createEdge(nodeOne, nodeTwo) {
  if (nodeOne != undefined && nodeTwo != undefined && nodeOne != nodeTwo && !connected(nodeOne, nodeTwo)) {
    console.log("masuk")
    var path = new google.maps.Polyline({
      path: [nodeOne.position, nodeTwo.position],
      strokeColor: '#d5edff',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    path.setMap(map);

    polylines.push({
      path: path,
      data: {
        first: nodeOne['label'],
        second: nodeTwo['label']
      }
    });

    updateEdgeList();
  } else {
    alert("Path already selected");
  }
}

function updateEdgeList() {
  $(edgeList).empty();
  for (var i = 0; i < polylines.length; i++) {
    $(`<li>${polylines[i].data.first} -- ${polylines[i].data.second}</li>`).appendTo(edgeList)
  }
}

function removeEdgeList() {
  $(edgeList).empty();
}

function updateVertexPicker() {
  $(startVertexPicker).empty();
  $(endVertexPicker).empty();
  for(var i = 0; i < markers.length; i++) {
    $(startVertexPicker).append($("<option></option>").attr("value", markers[i].data.label).text(markers[i].data.label.toString()))
    $(endVertexPicker).append($("<option></option>").attr("value", markers[i].data.label).text(markers[i].data.label.toString()))
  }
}

function removeVertexPicker() {
  $(startVertexPicker).empty();
  $(endVertexPicker).empty();
}

function updateVertexList() {
  $(vertexList).empty();
  for(var i = 0; i < markers.length; i++) {
    $(`<li>${markers[i].marker.getPosition()}</li>`).appendTo(vertexList)
  }
}

function removeVertexList() {
  $(vertexList).empty();
}

function connected(nodeOne, nodeTwo) {
  var found = false;
  for (var i = 0; i < polylines.length; i++) {
    if((polylines[i]['data']['first'] == nodeOne.label && polylines[i]['data']['second'] == nodeTwo.label) || 
        (polylines[i]['data']['first'] == nodeTwo.label && polylines[i]['data']['second'] == nodeOne.label)) {
      found = true;
      break;
    }
  }
  return found;
}

function toggleBounce(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE)
}

function disableAnimation() {
  for(var i = 0; i < markers.length; i++) {
    markers[i]['marker'].setAnimation(null);
  }
}

function removeMarkers() {
  for (var i = 0; i < markers.length; i++) {
      markers[i]['marker'].setMap(null);
    }
    markers = [];
    labelIndex = 0;
}

function removePolylines() {
  for (var i = 0; i < polylines.length; i++) {
      polylines[i]['path'].setMap(null);
    }
    polylines = [];
}

function drawPath(nodeOne, nodeTwo, color) {
  var path = new google.maps.Polyline({
      path: [nodeOne.position, nodeTwo.position],
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

  path.setMap(map);
}

function drawAllPolylines() {
  for(var i = 0; i < polylines.length; i++) {
    var nodeOne = markers.find(function(x) { return x['marker'].label == polylines[i].data.first });
    var nodeTwo = markers.find(function(x) { return x['marker'].label == polylines[i].data.second });
    drawPath(nodeOne.marker, nodeTwo.marker, "d5edff");
  }
}

function removePolylinesFromMap() {
  for (var i = 0; i < polylines.length; i++) {
      polylines[i]['path'].setMap(null);
    }
}

function getDistance(latlng1, latlng2) {
  return google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
}

function createAdjacencyDistanceMatrix() {
  distanceMatrix = [];
  adjacencyMatrix = [];
  for(var i = 0; i < markers.length; i++) {
    tempDistance = [];
    tempAdjacency = [];
    for(var j = 0; j < markers.length; j++) {
      tempDistance.push(getDistance(markers[i].data.position, markers[j].data.position));
      if(connected(markers[i].marker, markers[j].marker)) {
        tempAdjacency.push(1);
      } else {
        tempAdjacency.push(0);
      }
    }
    distanceMatrix.push(tempDistance);
    adjacencyMatrix.push(tempAdjacency);
  }
}

function getShortestPath(startNode, endNode) {
  createAdjacencyDistanceMatrix();
  var payload = JSON.stringify({
    length: markers.length,
    adjMat: adjacencyMatrix,
    distMat: distanceMatrix,
    start: startNode,
    end: endNode
  });

  console.log(payload);

  $.post('go', payload, function(data) {
    console.log(data);

    removePolylinesFromMap();
    pathNode = [];
    for(var i = 0; i < data['path'].length; i++) {
      pathNode.push(markers[data['path'][i]].marker);
    }

    drawAllPolylines();
    
    for(var i = 0; i < pathNode.length - 1; i++) {
      drawPath(pathNode[i], pathNode[i + 1], "#e00000")
    }
  })
}

/* On Click */
$('#reset').on('click', function() {
  console.log("reset called")
  removeMarkers();
  removePolylines();
  removeVertexList();
  removeVertexPicker();
  removeEdgeList();

  if (shortestPath != null) {
    shortestPath.setMap(null);
    shortestPath = null;
  }
});

$('#submit').on('click', function() {
  console.log(adjacencyMatrix)
  console.log(distanceMatrix)
  var startNodeLabel = $('#start-select').find(":selected").val();
  var endNodeLabel = $('#end-select').find(":selected").val();
  getShortestPath(startNodeLabel, endNodeLabel);
  // Insert here to kirim data ke flask
});