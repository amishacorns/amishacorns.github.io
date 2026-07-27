---
title: "AI, Agents, and What Comes Next"
permalink: /
layout: single
author_profile: true
description: "Jordan Dotzel is an AI researcher and agent architect writing about agents, AGI safety, moral progress, and the future created by increasingly capable AI systems."
excerpt: "AI researcher and agent architect writing about how we reach AGI, how we survive it, and what comes after."
sitemap: true
---

<div class="home-hero">
  <p class="home-kicker">AI systems &middot; agents &middot; AGI safety</p>
  <p class="home-lead">I'm Jordan Dotzel, an AI researcher and Agent Architect writing about how we reach AGI, how we survive it, and what comes after.</p>
  <div class="home-actions">
    <a class="btn btn--primary" href="/musings/">Read the Musings</a>
    <a class="btn btn--ghost" href="/about/">About Me</a>
  </div>
</div>

<section class="home-section">
  <div class="home-section__heading">
    <h2>Start Here</h2>
    <p>Three short essays that capture the central argument running through the site.</p>
  </div>
  <div class="home-card-grid">
    <article class="home-card">
      <a class="home-card__image" href="/posts/paths/"><img src="/images/critical.png" alt="" loading="lazy"></a>
      <div class="home-card__body">
        <p class="home-card__eyebrow">The path</p>
        <h3><a href="/posts/paths/">All Paths Lead to AGI</a></h3>
        <p>Why the fastest route to progress in every field increasingly runs through artificial intelligence.</p>
      </div>
    </article>
    <article class="home-card">
      <a class="home-card__image" href="/posts/is-sometime-now/"><img src="/images/is-sometime-now.jpg" alt="" loading="lazy"></a>
      <div class="home-card__body">
        <p class="home-card__eyebrow">The danger</p>
        <h3><a href="/posts/is-sometime-now/">Is Sometime Now?</a></h3>
        <p>Every scientific field eventually produces knowledge too dangerous to distribute freely.</p>
      </div>
    </article>
    <article class="home-card">
      <a class="home-card__image" href="/posts/granny/"><img src="/images/granny-family.jpg" alt="" loading="lazy"></a>
      <div class="home-card__body">
        <p class="home-card__eyebrow">The destination</p>
        <h3><a href="/posts/granny/">Should We Do as Granny Says?</a></h3>
        <p>Human values should be a place for superintelligence to begin, not a place for moral discovery to stop.</p>
      </div>
    </article>
  </div>
</section>

<section class="home-section">
  <div class="home-section__heading home-section__heading--inline">
    <div>
      <h2>Latest Writing</h2>
      <p>Short arguments, unfinished maps, and occasional acts of public disagreement.</p>
    </div>
    <a href="/musings/">View all</a>
  </div>
  <div class="home-latest">
    {% for post in site.posts limit:4 %}
      <a class="home-latest__item" href="{{ post.url }}">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d, %Y" }}</time>
        <span>{{ post.title }}</span>
        <small>{{ post.description | default: post.excerpt | markdownify | strip_html | strip_newlines | truncate: 150 }}</small>
      </a>
    {% endfor %}
  </div>
</section>

<section class="home-section home-research">
  <p class="home-kicker">Research &amp; Work</p>
  <h2>Building the systems behind the arguments.</h2>
  <p>I work on agents at Google and completed my PhD at Cornell. My academic research focused on efficient neural architectures, low-precision quantization, and dynamic sparsity.</p>
  <a href="/about/">Research, publications, and experience &rarr;</a>
</section>

{% include newsletter-signup.html %}
