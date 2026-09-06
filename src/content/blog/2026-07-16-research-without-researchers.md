---
title: 'Research Without Researchers'
date: 2026-07-16
permalink: /posts/research-without-researchers/
topics:
  - AI
tags:
  - artificial intelligence
  - research
  - academia
description: "AI separates the university's two historical products: educated researchers and research output."
header:
  teaser: "lab-of-one.webp"
---

The university research group was built around a constraint: research required researchers. A professor who wanted to pursue five ideas needed roughly five people capable of pursuing them.

The arrangement joined two useful functions. Graduate students learned how to produce knowledge while supplying the intelligence and labor that produced it. They also taught courses, mentored undergraduates, and eventually became the next generation of professors. Research output and researcher training became one system because the same people generated both.

<picture>
  <source media="(max-width: 640px)" srcset="/images/unbundling-university-lab-mobile.svg">
  <img src="/images/unbundling-university-lab.svg" alt="The university lab separating into education and research institutions">
</picture>

*AI breaks the dependency between training researchers and producing research.*

GPT-4 started weakening that dependency. Mythos-class systems such as GPT-5.6 Sol and Claude Fable 5 make the consequence much more obvious. In fields where the work can be executed entirely in software, asking a model directly is often faster and produces better work than assigning the same task to a junior researcher. Mathematics is now following the same path.<sup><a href="#ref-1">1</a></sup> Software engineering, AI research, and computational science should move sooner because execution and verification already happen inside a computer.

A professor can already replace much of the apprentice hierarchy with an agent hierarchy. One model maintains the objective while others search the literature, implement, test, criticize, reproduce, and write. Current systems still need high-level direction and sometimes lose context across long projects. Those constraints are shrinking quickly: the length of tasks models can complete autonomously has recently doubled about every four months.<sup><a href="#ref-2">2</a></sup> By 2027, most research contained entirely within a computer may require no graduate hierarchy at all.

<picture>
  <source media="(max-width: 640px)" srcset="/images/ai-research-pipeline-mobile.svg">
  <img src="/images/ai-research-pipeline.svg" alt="A human research hierarchy replaced by a model directing specialized research agents">
</picture>

*The apprentice hierarchy can be implemented as an agent hierarchy.*

A professor can preserve the apprentice hierarchy by placing students above the agents. Twenty AI-enabled students will usually produce more total work than one professor. Cost determines whether that remains the best structure. A student adds judgment and accountability alongside fallibility, variable performance, coordination costs, years of training, faculty supervision, compensation, benefits, tuition, and university charges. Hiring one in 2027 commits roughly $300,000 over five years to a capability that may, at best, double during the degree. The same budget buys model inference that can run continuously, branch across projects, and improve throughout the entire commitment.

Over the last few years, the same level of AI performance has become roughly ten times cheaper each year across reasoning, mathematics, and software engineering. Some tasks have moved much faster.<sup><a href="#ref-3">3</a></sup> The figure extends that tenfold rate through 2027, which makes one dollar buy roughly 10,000× as much capability as it bought in 2023. The human researcher line sits at an illustrative 100,000× the 2023 AI baseline. Hardware constraints, energy, data, and diminishing algorithmic returns will eventually bend the curve, so the projections include continued growth, progressive slowdown, and an immediate plateau.

<picture>
  <source media="(max-width: 640px)" srcset="/images/phd-ai-compounding-mobile.svg">
  <img src="/images/phd-ai-compounding.svg" alt="Historical improvement in AI capability per dollar followed by continued, slowing, and plateau scenarios across a five-year PhD">
</picture>

*The plateau case preserves the 10,000× improvement accumulated before the student begins.*

Graduate research still has educational value. Students learn scientific judgment by conducting research, just as medical students examine patients and pilots spend time in simulators. The activity can remain valuable for training after student labor stops being the efficient way to produce the underlying result.

The first-order effect is fewer graduate researchers per professor. The second-order effect reaches the rest of the university. Graduate researchers teach undergraduates, mentor junior students, staff courses, and supply the pipeline for future faculty. When research groups stop needing that labor, departments must justify and support graduate education on its educational value alone.

For two centuries, universities trained researchers by using them to produce research. A student hired in 2027 will graduate after five more generations of AI systems and five more years of falling inference costs. Universities can continue producing people who understand research. They will no longer need those people to produce most of it.

## References

<ol>
  <li id="ref-1">Google DeepMind, <a href="https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/">“Advanced Version of Gemini With Deep Think Officially Achieves Gold-Medal Standard at the International Mathematical Olympiad,”</a> 2025; OpenAI, <a href="https://openai.com/index/model-disproves-discrete-geometry-conjecture/">“An OpenAI Model Has Disproved a Central Conjecture in Discrete Geometry,”</a> 2026.</li>
  <li id="ref-2">METR, <a href="https://metr.org/blog/2026-05-19-frontier-risk-report/">“Frontier Risk Report: February to March 2026,”</a> and Thomas Kwa, <a href="https://metr.org/notes/2026-01-22-time-horizon-limitations/">“Clarifying Limitations of Time Horizon,”</a> 2026.</li>
  <li id="ref-3">Epoch AI, <a href="https://epoch.ai/data-insights/llm-inference-price-trends">“LLM Inference Prices Have Fallen Rapidly but Unequally Across Tasks,”</a> 2025; Hans Gundlach et al., <a href="https://arxiv.org/abs/2511.23455">“The Price of Progress: Algorithmic Efficiency and the Falling Cost of AI Inference,”</a> 2025.</li>
</ol>
