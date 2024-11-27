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

<script>
    document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    var map = L.map('map').setView([0, 0], 2);

    // Set up the OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var locations = [
        { lat: 40.7128, lng: -74.0060, title: "New York, USA" },
        { lat: 48.8566, lng: 2.3522, title: "Paris, France" },
        { lat: 19.4326, lng: -99.1332, title: "Mexico City, Mexico" },
        { lat: 10.9685, lng: -74.7813, title: "Barranquilla, Colombia" },
        { lat: 37.8882, lng: -4.7794, title: "Córdoba, Spain" },
        { lat: 25.276987, lng: 55.296249, title: "Dubai, UAE" },
        { lat: 18.1096, lng: -77.2975, title: "Jamaica" },
        { lat: 18.2208, lng: -66.5901, title: "Puerto Rico" },
        { lat: 18.3358, lng: -64.8963, title: "Virgin Islands" },
        { lat: 41.9028, lng: 12.4964, title: "Rome, Italy" },
        { lat: 50.0647, lng: 19.9450, title: "Krakow, Poland" },
        { lat: 48.2082, lng: 16.3738, title: "Vienna, Austria" },
        { lat: 51.5074, lng: -0.1278, title: "London, UK" },
        { lat: 48.1351, lng: 11.5820, title: "Munich, Germany" },
        { lat: 47.3769, lng: 8.5417, title: "Zurich, Switzerland" },
        { lat: 40.4168, lng: -3.7038, title: "Madrid, Spain" },
        { lat: 41.3851, lng: 2.1734, title: "Barcelona, Spain" },
        { lat: 59.9139, lng: 10.7522, title: "Oslo, Norway" },
        { lat: 63.4305, lng: 10.3951, title: "Trondheim, Norway" },
        { lat: 50.8503, lng: 4.3517, title: "Brussels, Belgium" },
        { lat: 47.0502, lng: 8.3093, title: "Lucerne, Switzerland" },
        { lat: 41.0082, lng: 28.9784, title: "Istanbul, Turkey" },
        { lat: 30.0444, lng: 31.2357, title: "Cairo, Egypt" },
        { lat: 47.4979, lng: 19.0402, title: "Budapest, Hungary" },
        { lat: 25.0330, lng: 121.5654, title: "Taipei, Taiwan" },
        { lat: 13.7563, lng: 100.5018, title: "Bangkok, Thailand" },
        { lat: 47.8095, lng: 13.0550, title: "Salzburg, Austria" },
        { lat: 47.2692, lng: 11.4041, title: "Innsbruck, Austria" },
        { lat: 37.3891, lng: -5.9845, title: "Sevilla, Spain" },
        { lat: 38.7223, lng: -9.1393, title: "Lisbon, Portugal" },
        { lat: 18.4861, lng: -69.9312, title: "Santo Domingo, Dominican Republic" },
        { lat: 14.5611, lng: -90.7344, title: "Antigua Guatemala, Guatemala" },
        { lat: 9.7489, lng: -83.7534, title: "Costa Rica" }, 
        { lat: 10.3910, lng: -75.4794, title: "Cartagena, Colombia" },
        { lat: 22.7709, lng: -102.5833, title: "Zacatecas, Mexico" },
        { lat: 21.1619, lng: -86.8515, title: "Cancun, Mexico" },
        { lat: 42.4430, lng: -76.5019, title: "Ithaca, USA" }, 
        { lat: 42.6526, lng: -73.7562, title: "Albany, USA" },
        { lat: 43.1566, lng: -77.6088, title: "Rochester, USA" },
        { lat: 39.9612, lng: -82.9988, title: "Columbus, USA" },
        { lat: 41.8781, lng: -87.6298, title: "Chicago, USA" },
        { lat: 41.2565, lng: -95.9345, title: "Omaha, USA" },
        { lat: 39.9526, lng: -75.1652, title: "Philadelphia, USA" },
        { lat: 40.2732, lng: -76.8867, title: "Harrisburg, USA" },
        { lat: 41.4089, lng: -75.6624, title: "Scranton, USA" },
        { lat: 41.1176, lng: -73.4082, title: "Norwalk, USA" },
        { lat: 40.4862, lng: -74.4518, title: "New Brunswick, USA" }, 
        { lat: 39.9537, lng: -74.1979, title: "Toms River, USA" },
        { lat: 39.2776, lng: -74.5746, title: "Ocean City, USA" },
        { lat: 34.0522, lng: -118.2437, title: "Los Angeles, USA" },
        { lat: 37.7749, lng: -122.4194, title: "San Francisco, USA" },
        { lat: 37.3382, lng: -121.8863, title: "San Jose, USA" },
        { lat: 30.2672, lng: -97.7431, title: "Austin, USA" },
        { lat: 29.4241, lng: -98.4936, title: "San Antonio, USA" },
        { lat: 32.7767, lng: -96.7970, title: "Dallas, USA" },
        { lat: 36.1699, lng: -115.1398, title: "Las Vegas, USA" },
        { lat: 45.5051, lng: -122.6750, title: "Portland, USA" },
        { lat: 47.6062, lng: -122.3321, title: "Seattle, USA" },
        { lat: 49.2827, lng: -123.1207, title: "Vancouver, Canada" },
        { lat: 39.7392, lng: -104.9903, title: "Denver, USA" },
        { lat: 38.8339, lng: -104.8214, title: "Colorado Springs, USA" },
        { lat: 45.5051, lng: -122.6750, title: "Portland, USA" },
        { lat: 47.6062, lng: -122.3321, title: "Seattle, USA" },
        { lat: 49.2827, lng: -123.1207, title: "Vancouver, Canada" },
        { lat: 39.7392, lng: -104.9903, title: "Denver, USA" },
        { lat: 38.8339, lng: -104.8214, title: "Colorado Springs, USA" },
        { lat: 41.6005, lng: -93.6091, title: "Des Moines, USA" },
        { lat: 37.3861, lng: -122.0839, title: "Mountain View, USA" },
        { lat: 50.1163, lng: -122.9574, title: "Whistler, Canada" },
        { lat: 47.9129, lng: -122.0982, title: "Snohomish, USA" },
        { lat: 36.9741, lng: -122.0308, title: "Santa Cruz, USA" },
        { lat: 21.3069, lng: -157.8583, title: "Honolulu, USA" },
        { lat: 28.5383, lng: -81.3792, title: "Orlando, USA" },
        { lat: 26.7153, lng: -80.0534, title: "West Palm Beach, USA" },
        { lat: 25.7617, lng: -80.1918, title: "Miami, USA" },
        { lat: 29.9511, lng: -90.0715, title: "New Orleans, USA" },
        { lat: 36.1627, lng: -86.7816, title: "Nashville, USA" },
        { lat: 35.7796, lng: -78.6382, title: "Raleigh, USA" },
        { lat: 38.9072, lng: -77.0369, title: "Washington DC, USA" },
        { lat: 42.9634, lng: -85.6681, title: "Grand Rapids, USA" },
        { lat: 45.5017, lng: -73.5673, title: "Montreal, Canada" },
        { lat: 43.651070, lng: -79.347015, title: "Toronto, Canada" },
        { lat: 46.8139, lng: -71.2082, title: "Quebec City, Canada" },
        { lat: 42.3601, lng: -71.0589, title: "Boston, USA" },
        { lat: 45.5051, lng: -122.6750, title: "Portland, USA" },
        { lat: 47.6062, lng: -122.3321, title: "Seattle, USA" },
        { lat: 49.2827, lng: -123.1207, title: "Vancouver, Canada" },
        { lat: 39.7392, lng: -104.9903, title: "Denver, USA" },
        { lat: 38.8339, lng: -104.8214, title: "Colorado Springs, USA" },
        { lat: 41.6005, lng: -93.6091, title: "Des Moines, USA" },
        { lat: 37.3861, lng: -122.0839, title: "Mountain View, USA" },
        { lat: 50.1163, lng: -122.9574, title: "Whistler, Canada" },
        { lat: 47.9129, lng: -122.0982, title: "Snohomish, USA" },
        { lat: 36.9741, lng: -122.0308, title: "Santa Cruz, USA" },
        { lat: 21.3069, lng: -157.8583, title: "Honolulu, USA" },
        { lat: 28.5383, lng: -81.3792, title: "Orlando, USA" },
        { lat: 26.7153, lng: -80.0534, title: "West Palm Beach, USA" },
        { lat: 25.7617, lng: -80.1918, title: "Miami, USA" },
        { lat: 29.9511, lng: -90.0715, title: "New Orleans, USA" },
        { lat: 36.1627, lng: -86.7816, title: "Nashville, USA" },
        { lat: 35.7796, lng: -78.6382, title: "Raleigh, USA" },
        { lat: 38.9072, lng: -77.0369, title: "Washington DC, USA" },
        { lat: 42.9634, lng: -85.6681, title: "Grand Rapids, USA" },
        { lat: 45.5017, lng: -73.5673, title: "Montreal, Canada" },
        { lat: 43.651070, lng: -79.347015, title: "Toronto, Canada" },
        { lat: 46.8139, lng: -71.2082, title: "Quebec City, Canada" },
        { lat: 42.3601, lng: -71.0589, title: "Boston, USA" },
        { lat: 42.0584, lng: -70.1786, title: "Provincetown, USA" },
        { lat: 38.0498, lng: -84.4970, title: "Lexington, USA" },
        { lat: 42.4906, lng: -71.2760, title: "Bedford, USA" },
        { lat: 41.6688, lng: -70.2962, title: "Cape Cod, USA" },
        { lat: 44.4759, lng: -73.2121, title: "Burlington, USA" },
        { lat: 43.0962, lng: -79.0377, title: "Niagara Falls, USA" },
        { lat: 44.8012, lng: -68.7778, title: "Bangor, USA" },
        { lat: 43.0481, lng: -76.1474, title: "Syracuse, USA" },
        { lat: 42.3809, lng: -76.8735, title: "Watkins Glen, USA" },
        { lat: 42.1429, lng: -77.0547, title: "Corning, USA" },
        { lat: 42.0987, lng: -75.9180, title: "Binghamton, USA" },
        { lat: 41.2459, lng: -75.8813, title: "Wilkes-Barre, USA" },
        { lat: 40.9584, lng: -75.9746, title: "Hazleton, USA" },
        { lat: 40.0379, lng: -76.3055, title: "Lancaster, USA" },
        { lat: 40.7934, lng: -77.8600, title: "State College, USA" },
        { lat: 41.8240, lng: -71.4128, title: "Providence, USA" },
        { lat: 43.6267, lng: -72.7986, title: "Killington, USA" },
        { lat: 42.1015, lng: -72.5898, title: "Springfield, USA" },
        { lat: 41.0935, lng: -73.8584, title: "Sleepy Hollow, USA" },
        { lat: 40.6023, lng: -75.4714, title: "Allentown, USA" },
        { lat: 36.1069, lng: -112.1129, title: "Grand Canyon, USA" },
        { lat: 36.1069, lng: -112.1129, title: "Grand Canyon, USA" },
        { lat: 42.5195, lng: -70.8967, title: "Salem, MA, USA" },
        { lat: 44.8012, lng: -68.7778, title: "Bangor, ME, USA" },
        { lat: 33.7490, lng: -84.3880, title: "Atlanta, USA" },
        { lat: 40.8136, lng: -96.7026, title: "Lincoln, NE, USA" },
        { lat: 33.7701, lng: -118.1937, title: "Long Beach, USA" },
        { lat: 33.6189, lng: -117.9298, title: "Newport Beach, USA" },
        { lat: 36.6002, lng: -121.8947, title: "Monterey, USA" },
        { lat: 38.5449, lng: -121.7405, title: "Davis, USA" },
        { lat: 19.6925, lng: -98.8436, title: "Teotihuacan, Mexico" }
    ];

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
});
</script>