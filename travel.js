window.onload = function () {
  // Update Progress Bar
  if (typeof locations !== 'undefined' && Array.isArray(locations)) {
    // Extract country names from title
    const countries = locations.map(loc => {
      const parts = loc.title.split(',').map(part => part.trim());
      return parts[parts.length - 1]; // Assuming last part is country
    });

    // Get unique countries
    const uniqueCountries = [...new Set(countries)];

    // Total countries recognized
    const totalCountries = 195;
    const completed = uniqueCountries.length;
    const percentage = ((completed / totalCountries) * 100).toFixed(1);

    // Update progress bar width and text
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    progressBar.style.width = percentage + '%';
    progressText.textContent = percentage + '%';

    // Add a red reference line representing expected progress at current age
    // Dynamically compute age from birth year (1995)
    const birthYear = 1995;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentAge = currentYear - birthYear; // Year-based age without month/day precision
    const lifeExpectancy = 100;
    // Expected progress as a percentage (if evenly distributed)
    const expectedPercentage = ((currentAge / lifeExpectancy) * 100).toFixed(1);

    // Ensure the progress bar container is positioned relatively
    const progressContainer = progressBar.parentElement;
    progressContainer.style.position = "relative";

    // Create the red reference line
    const referenceLine = document.createElement("div");
    referenceLine.style.position = "absolute";
    referenceLine.style.top = "0";
    referenceLine.style.bottom = "0";
    referenceLine.style.left = expectedPercentage + "%";
    referenceLine.style.width = "4px";
    referenceLine.style.backgroundColor = "red";
    progressContainer.appendChild(referenceLine);
  } else {
    console.error('locations array not found or not an array');
  }

  // Initialize the map
  var map = L.map('map', {
    minZoom: 2,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0
  }).setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true,
    bounds: [[-90, -180], [90, 180]]
  }).addTo(map);

  locations.forEach(function (location) {
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