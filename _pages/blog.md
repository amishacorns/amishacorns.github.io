---
permalink: /musings/
layout: archive
title: "Musings"
author_profile: true
description: "Short essays by Jordan Dotzel about AI systems, agents, AGI safety, philosophy, and technological progress."
---

{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}
