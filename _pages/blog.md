---
permalink: /musings/
layout: archive
title: "Musings"
author_profile: true
description: "Short essays by Jordan Dotzel about AI systems, agents, AGI safety, philosophy, and technological progress."
---

{% include base_path %}

<div class="musings-intro">
  <p>Essays about increasingly capable AI systems, the civilization forming around them, and the odd assumptions we may regret freezing in place.</p>
</div>

<div class="musings-grid">
{% for post in site.posts %}
  {% assign card_image = post.header.teaser | default: site.og_image %}
  {% assign words = post.content | number_of_words %}
  {% assign minutes = words | divided_by: site.words_per_minute %}
  {% if minutes < 1 %}{% assign minutes = 1 %}{% endif %}
  <article class="musing-card">
    <a class="musing-card__image" href="{{ post.url }}">
      <img src="{% if card_image contains '://' %}{{ card_image }}{% else %}{{ card_image | prepend: '/images/' | prepend: base_path }}{% endif %}" alt="" loading="lazy">
    </a>
    <div class="musing-card__body">
      <p class="musing-card__meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time> · {{ minutes }} min read</p>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <p>{{ post.description | default: post.excerpt | markdownify | strip_html | strip_newlines | truncate: 190 }}</p>
      <a class="musing-card__read" href="{{ post.url }}">Read essay →</a>
    </div>
  </article>
{% endfor %}
</div>

{% include newsletter-signup.html %}
