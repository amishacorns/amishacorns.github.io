window.addEventListener('load', function () {
  if (typeof locations !== 'undefined' && Array.isArray(locations)) {
    const countries = locations.map(function (location) {
      const parts = location.title.split(',').map(function (part) { return part.trim(); });
      return parts[parts.length - 1];
    });

    const uniqueCountries = Array.from(new Set(countries));
    const totalCountries = 195;
    const completed = uniqueCountries.length;
    const percentage = ((completed / totalCountries) * 100).toFixed(1);

    document.getElementById('country-progress-bar').style.width = percentage + '%';
    document.getElementById('country-progress-value').textContent = percentage + '%';
  } else {
    console.error('locations array not found or not an array');
  }

  const map = L.map('map', {
    minZoom: 2,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0
  }).setView([20, 0], 2);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    noWrap: true,
    bounds: [[-90, -180], [90, 180]],
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  locations.forEach(function (location) {
    L.circleMarker([location.lat, location.lng], {
      radius: 5,
      color: '#b9f6ff',
      weight: 1,
      fillColor: '#62dfff',
      fillOpacity: 0.78,
      className: 'travel-map-marker'
    }).addTo(map).bindPopup(location.title);
  });
});