window.onload = function() {
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
    } else {
        console.error('locations array not found or not an array');
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
}
