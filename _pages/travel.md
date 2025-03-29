---
title: "Binsky Speedrun"
permalink: /travel/
author_profile: true
---

<p> In honor of the Great Drew Binsky, who hit every country in the world and documented it on <a href="https://www.youtube.com/channel/UC0Ize0RLIbGdH5x4wI45G-A">YouTube</a>. Assuming a healthy traveling remaining life-span of 40 years, traveling to all the 195 United Nations recognized countries in the world requires about 5 countries per year. This seems doable especially assuing for some late bursts after retirement, cheaper travel in the future, and improved conditions in many currently disadvantaged countries. </p>

<!-- Progress Bar -->
<div style="width: 100%; background-color: #f3f3f3; border-radius: 5px; margin: 20px 0;">
  <div id="progress-bar" style="width: 0%; height: 24px; background-color: #4caf50; text-align: center; line-height: 24px; color: white; border-radius: 5px;">
    <span id="progress-text">0%</span>
  </div>
</div>

<div id="map" style="width: 100%; height: 600px;"></div>

<!-- Include Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />

<!-- Include Leaflet JavaScript -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<!-- Include Locations and Travel JavaScript -->
<script src="{{ site.baseurl }}/locations.js"></script>
<script src="{{ site.baseurl }}/travel.js"></script>
