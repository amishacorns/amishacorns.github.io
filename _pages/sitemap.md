---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
description: "A directory of the public pages and essays on Jordan Dotzel's website."
---

{% include base_path %}

A directory of the public pages and essays on this site. An [XML version]({{ base_path }}/sitemap.xml) is available for search engines and feed readers.

<h2>Pages</h2>
{% for post in site.pages %}
  {% unless post.sitemap == false or post.url == "/404.html" or post.title == nil %}
    {% include archive-single.html %}
  {% endunless %}
{% endfor %}

<h2>Posts</h2>
{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}

{% for collection in site.collections %}
  {% unless collection.output == false or collection.label == "posts" or collection.docs.size == 0 %}
    <h2>{{ collection.label }}</h2>
    {% for post in collection.docs %}
      {% include archive-single.html %}
    {% endfor %}
  {% endunless %}
{% endfor %}
