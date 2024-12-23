---
title: "Binsky Speedrun"
permalink: /travel/
author_profile: true
---

<p>In honor of the Great Drew Binsky, who hit every country in the world and documented it on <a href="https://www.youtube.com/channel/UC0Ize0RLIbGdH5x4wI45G-A">YouTube</a>. Geopolitical borders are not really important, since the languages, sites, and cultures are what matters. But they are the easiest to count. The progress bar counts from the 195 countries recognized by the United Nations. </p>

<!-- Progress Bar -->
<div style="width: 100%; background-color: #f3f3f3; border-radius: 5px; margin: 20px 0;">
  <div style="width: 13%; height: 24px; background-color: #4caf50; text-align: center; line-height: 24px; color: white; border-radius: 5px;">
    13%
  </div>
</div>

<div id="map" style="width: 100%; height: 600px;"></div>

<!-- Include Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />

<!-- Include Leaflet JavaScript -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<!-- Include Locations JavaScript -->
<script src="{{ site.baseurl }}/locations.js"></script>

<script>
window.onload = function() {
    var map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    locations.forEach(function(location) {
      L.marker([location.lat, location.lng], { 
        icon: L.icon({ 
          iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', 
          iconSize: [38, 95], 
          iconAnchor: [22, 94], 
          popupAnchor: [-3, -76], 
          shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png', 
          shadowSize: [50, 64], 
          shadowAnchor: [4, 62] 
        }) 
      })
      .addTo(map)
      .bindPopup(location.title);
    });
}
</script>