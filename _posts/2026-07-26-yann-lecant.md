---
title: "Yann LeCan't"
date: 2026-07-26
permalink: /posts/yann-lecant/
excerpt: |
  ![Yann LeCan't](/images/yann-lecant-lifeboat.png){: style="display: block; margin: 0 auto; width: 500px;"}

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
  .wos-badge {
    display: inline-block;
    font-size: 0.68em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.18em 0.55em;
    border-radius: 3px;
    color: #fff;
    vertical-align: middle;
    margin-bottom: 0.5em;
  }
  .badge-wrong { background: #c0392b; }
  .badge-false { background: #7b241c; }
  .badge-move  { background: #2471a3; }
  .badge-clock { background: #c87f0a; }
  .badge-hot   { background: #8e44ad; }
  .badge-pend  { background: #7f8c8d; }
</style>

![Yann LeCan't](/images/yann-lecant-lifeboat.png){: style="display: block; margin: 0 auto 2em; width: 700px; max-width: 100%;"}

<div class="wos-intro" markdown="1">
A running record of confident pronouncements from leaders in AI that were
wrong on arrival, rendered empirically false, preserved through moving
definitions, or are quietly on the clock. Every quote is verbatim and links to
the best available source. The point is not that smart people are sometimes
wrong. It is the pattern of turning a limitation of one implementation at one
moment into a fundamental limitation of the entire approach. Receipts only.

Here, an *LLM-based system* includes the language model and the machinery built
around it: post-training, inference-time computation, search, memory, tools, and
agent loops. Excluding each successful extension after the fact makes “LLMs
can’t do X” impossible to falsify.

A next-token training objective describes how the model is trained. It does not
place a ceiling on what computation the resulting system can perform.
</div>

{% for person in site.data.wall_of_shame.people %}
<div class="wos-person">
  <h2>{{ person.title }}</h2>
  <p class="wos-sub"><a href="https://x.com/{{ person.handle | remove: '@' }}">{{ person.handle }}</a> · {{ person.role }}</p>
  <p class="wos-blurb">{{ person.blurb }}</p>

  {% for q in person.quotes %}
  {% case q.status %}
    {% when 'Wrong on arrival' %}{% assign badge = 'badge-wrong' %}
    {% when 'Moving goalposts' %}{% assign badge = 'badge-move' %}
    {% when 'Empirically false' %}{% assign badge = 'badge-false' %}
    {% when 'Clock ticking' %}{% assign badge = 'badge-clock' %}
    {% when 'Hot take' %}{% assign badge = 'badge-hot' %}
    {% else %}{% assign badge = 'badge-pend' %}
  {% endcase %}
  <div class="wos-quote">
    <span class="wos-badge {{ badge }}">{{ q.status }}</span>
    {% if q.context and q.context != "" %}<p class="wos-context">{{ q.context }}</p>{% endif %}
    <p class="q">&ldquo;{{ q.text | strip_newlines }}&rdquo;</p>
    <p class="wos-cite">&mdash; {{ person.name }}, {% if q.url and q.url != "" %}<a href="{{ q.url }}">{{ q.source }}</a>{% else %}{{ q.source }}{% endif %}, {{ q.date }}</p>
    {% if q.note and q.note != "" %}<p class="wos-note">{{ q.note }}</p>{% endif %}
  </div>
  {% endfor %}
</div>
{% endfor %}
