---
title: "Binsky Speedrun"
permalink: /travel/
author_profile: true
---

<p> In honor of the Great Drew Binsky, who hit every country in the world and documented it on <a href="https://www.youtube.com/channel/UC0Ize0RLIbGdH5x4wI45G-A">YouTube</a>. Assuming a healthy traveling remaining life-span of 40 years, traveling to all the 195 United Nations recognized countries in the world requires about 5 countries per year. This seems doable especially assuing for some late bursts after retirement, cheaper travel in the future, and improved conditions in many currently disadvantaged countries. </p>

<p> But political borders are very arbitrary, and what matters most is langauge, nature, and culture! A good list of these landmarks is maintained by the UNESCO World Heritage <a href="https://whc.unesco.org/en/list/">List</a>. These include 952 cultural sites, 231 natural sites, and 40 mixed as of February 2025. The red lines are the pace lines at my age assuming an 100 year life, which given future AI-assisted gains in health, still may be too short. Regardless, unless that age pushes to Biblical lengths, I'm falling off pace. </p>

<!-- Progress Bar for Countries -->
<div style="display: flex; align-items: center; margin: 20px 0;">
  <div style="width: 200px; font-weight: bold;">Countries</div>
  <div style="flex: 1; background-color: #f3f3f3; border-radius: 5px; position: relative;">
    <div id="progress-bar-countries" style="width: 0%; height: 24px; background-color: #4caf50; text-align: center; line-height: 24px; color: white; border-radius: 5px;">
      <span id="progress-text-countries"></span>
    </div>
  </div>
</div>

<!-- Progress Bar for UNESCO Sites -->
<div style="display: flex; align-items: center; margin: 20px 0;">
  <div style="width: 200px; font-weight: bold;">UNESCO Sites</div>
  <div style="flex: 1; background-color: #f3f3f3; border-radius: 5px; position: relative;">
    <div id="progress-bar-unesco" style="width: 0%; height: 24px; background-color: #2196F3; text-align: center; line-height: 24px; color: white; border-radius: 5px;">
      <span id="progress-text-unesco"></span>
    </div>
  </div>
</div>

<div id="map" style="width: 100%; height: 600px;"></div>

<!-- Include Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />

<!-- Include Leaflet JavaScript -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<!-- Include Locations JavaScript -->
<script src="{{ site.baseurl }}/locations.js"></script>

<!-- Include UNESCO Sites JavaScript -->
<script src="{{ site.baseurl }}/unescoSites.js"></script>

<script>
window.onload = function() {
    const currentAge = 29;
    const totalYears = 100;
    const totalCountries = 195;
    const totalUnescoSites = 952 + 231 + 40; // Cultural + Natural + Mixed

    // Calculate the yearly rate
    const yearlyCountryRate = totalCountries / totalYears;
    const yearlyUnescoRate = totalUnescoSites / totalYears;

    // Calculate the expected progress for a 29-year-old
    const expectedCountryProgress = (yearlyCountryRate * currentAge / totalCountries) * 100;
    const expectedUnescoProgress = (yearlyUnescoRate * currentAge / totalUnescoSites) * 100;

    // Update Progress Bar for Countries
    if (typeof locations !== 'undefined' && Array.isArray(locations)) {
        const countries = locations.map(loc => {
            const parts = loc.title.split(',').map(part => part.trim());
            return parts[parts.length - 1]; // Assuming last part is country
        });

        const uniqueCountries = [...new Set(countries)];
        const countryProgress = (uniqueCountries.length / totalCountries) * 100;

        document.getElementById('progress-bar-countries').style.width = countryProgress + '%';
        document.getElementById('progress-text-countries').innerText = countryProgress.toFixed(2) + '%';

        // Add reference point
        const countryReference = document.createElement('div');
        countryReference.style.position = 'absolute';
        countryReference.style.left = expectedCountryProgress + '%';
        countryReference.style.top = '0';
        countryReference.style.bottom = '0';
        countryReference.style.width = '2px';
        countryReference.style.backgroundColor = 'red';
        document.getElementById('progress-bar-countries').parentElement.appendChild(countryReference);
    }

    // Update Progress Bar for UNESCO Sites
    if (typeof unescoSites !== 'undefined' && Array.isArray(unescoSites)) {
        const unescoProgress = (unescoSites.length / totalUnescoSites) * 100;

        document.getElementById('progress-bar-unesco').style.width = unescoProgress + '%';
        document.getElementById('progress-text-unesco').innerText = unescoProgress.toFixed(2) + '%';

        // Add reference point
        const unescoReference = document.createElement('div');
        unescoReference.style.position = 'absolute';
        unescoReference.style.left = expectedUnescoProgress + '%';
        unescoReference.style.top = '0';
        unescoReference.style.bottom = '0';
        unescoReference.style.width = '2px';
        unescoReference.style.backgroundColor = 'red';
        document.getElementById('progress-bar-unesco').parentElement.appendChild(unescoReference);
    }

    // Initialize the map
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

    unescoSites.forEach(function(site) {
        L.marker([site.lat, site.lng], { 
            icon: L.icon({ 
                iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png', 
                iconSize: [38, 95], 
                iconAnchor: [22, 94], 
                popupAnchor: [-3, -76], 
                shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png', 
                shadowSize: [50, 64], 
                shadowAnchor: [4, 62] 
            }) 
        })
        .addTo(map)
        .bindPopup(site.title);
    });
}
</script>