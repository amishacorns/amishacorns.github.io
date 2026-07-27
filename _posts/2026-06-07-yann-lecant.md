---
title: "Yann LeCan't"
date: 2026-06-07
permalink: /posts/yann-lecant/
excerpt: |
  ![Yann LeCan't](/images/yann-lecant-lifeboat-v3.png){: style="display: block; margin: 0 auto; width: 500px;"}

  A running collection of confident claims about what LLMs can't do, plus a few guest appearances.
tags:
  - artificial intelligence
---

<style>
  .wos-intro { margin-bottom: 2em; }
  .wos-person { margin: 2.5em 0; }
  .wos-person h2 { margin-bottom: 0.1em; }
  .wos-sub { color: #6f777d; font-size: 0.85em; margin: 0 0 0.4em 0; }
  .wos-blurb { font-style: italic; color: #5b6166; margin-bottom: 1.2em; }
  .wos-quote {
    position: relative;
    border-left: 4px solid #b33;
    background: #faf8f8;
    margin: 1em 0;
    padding: 0.9em 1.1em 0.7em 1.1em;
    border-radius: 0 4px 4px 0;
  }
  .wos-context { font-size: 0.82em; color: #8a9095; font-style: italic; margin: 0 0 0.4em 0; }
  .wos-quote p.q { margin: 0 0 0.5em 0; font-size: 1.02em; }
  .wos-cite { font-size: 0.82em; color: #6f777d; }
  .wos-cite a { font-weight: 600; }
  .wos-note { margin: 0.6em 0 0 0; font-size: 0.9em; color: #333; }
  .wos-section-response { margin: 0.7em 0 1.8em; padding: 0.8em 1em; background: #f5f5f3; border-radius: 4px; color: #333; }
  .wos-section {
    margin: 1.8em 0 0.5em;
    font-size: 1.12em;
    color: #30363b;
  }
  .wos-footnote {
    margin-top: 3em;
    color: #6f777d;
    font-size: 0.82em;
    font-style: italic;
  }
</style>

![Yann LeCan't](/images/yann-lecant-lifeboat-v3.png){: style="display: block; margin: 0 auto 2em; width: 700px; max-width: 100%;"}

<div class="wos-intro" markdown="1">
The point isn't that smart people are sometimes wrong, or that strong opinions
should be kept private. The problem is what happens when a leader in AI keeps
turning the limitations of one implementation into limits of the entire field,
ignores weak exponential improvements as they compound, and uses that confidence
to dismiss safety work as premature. A bad prediction is harmless. Negligence
about a technology moving this quickly isn't, especially when the person making
it has the influence to shape what researchers, companies, and governments take
seriously. Every quote below links to the best source I could find.*
</div>

{% for person in site.data.wall_of_shame.people %}
<div class="wos-person">
  <h2>{{ person.title }}</h2>
  <p class="wos-sub"><a href="https://x.com/{{ person.handle | remove: '@' }}">{{ person.handle }}</a> · {{ person.role }}</p>
  <p class="wos-blurb">{{ person.blurb }}</p>

  {% assign sections = person.quotes | group_by: "section" %}
  {% for section in sections %}
  <h3 class="wos-section">{{ section.name }}</h3>
  {% for q in section.items %}
  <div class="wos-quote">
    {% if q.context and q.context != "" %}<p class="wos-context">{{ q.context }}</p>{% endif %}
    <p class="q">&ldquo;{{ q.text | normalize_whitespace }}&rdquo;</p>
    <p class="wos-cite">- {{ person.name }}, {% if q.url and q.url != "" %}<a href="{{ q.url }}">{{ q.source }}</a>{% else %}{{ q.source }}{% endif %}, {{ q.date }}</p>
  </div>
  {% endfor %}
  {% assign section_response = person.section_responses | where: "section", section.name | first %}
  {% if section_response and section_response.text != "" %}
  <div class="wos-section-response"><strong>Response:</strong> {{ section_response.text }}</div>
  {% endif %}
  {% endfor %}
</div>
{% endfor %}

<p class="wos-footnote">* This page was assembled with help from an LLM. Due to the major limitations of LLMs, it can hallucinate. If one of these quotes is fake, the LLM has accidentally made Yann LeCun's point for him.</p>
