---
title: 'Ban the Boomerboard'
date: 2026-06-19
permalink: /posts/ban-the-boomer-board/
excerpt: |
  The keyboard was a good interface for the typewriter. It should not be the default interface for intelligence.
tags:
  - artificial intelligence
  - productivity
description: "Why the keyboard is throttling communication with intelligent systems—and what offices should do about it."
header:
  teaser: "ban-the-boomer-board.png"
---

![Ban the Boomerboard](/images/ban-the-boomer-board.png){: style="display: block; margin: 0 auto; width: 500px;"}

The modern office is suspiciously quiet.

Walk through almost any company and you will see thousands of highly paid people staring into rectangles, moving their fingers in tiny bursts, and calling this knowledge work. The dominant interface between the human mind and the machine is still a grid of plastic buttons descended from the typewriter: the Boomerboard.

Keyboards are excellent for precision and discretion: editing a variable name, entering a password, moving a cursor three characters to the left, or working where speech would be disruptive. They are terrible as the default interface for expressing intent to an intelligent system.

| Interface | Words per Minute | Information Throughput | Coordinator Agents Under Management | Total Agents Under Management[^4] |
|---|---:|---:|---:|---:|
| Average typing[^1] | 52 | 1.0x | 3.1 | 15.5 |
| Fast typing[^1] | 78 | 1.5x | 4.7 | 23.5 |
| Normal speech[^2] | 150 | 2.9x | 9.0 | 45.0 |
| Fast AI speech scenario[^3] | 250 | 4.8x | 15.0 | 75.0 |

Words per minute is only a proxy for information throughput, but it is a useful one here. A twenty-minute conversation with an agent at 250 words per minute contains about 5,000 words. Even a fast typist needs more than 64 minutes to enter the same amount. That extra bandwidth can become objectives, constraints, examples, and a definition of done.

Most agents still require frequent steering: more context, another correction, or the next assignment. That makes the bottleneck managerial. The worker is fast, but the manager is still typing. Voice lets one person rotate among several coordinator agents, each directing a small fleet beneath it.

Managers already work by talking. They set goals, ask questions, review drafts, and redirect work. The microphone is not a novel behavior; it is management made legible to software.

The opportunity is not faster code generation. It is running more work in parallel: one agent inspects the codebase, another reproduces the bug, a third tests candidate fixes, and a coordinator returns the results for review.

The post-agentic office looks like senior management scaled to every desk. People remain in meetings all day, but most meetings are with agents. The org chart expands in software instead of payroll. Everyone becomes a manager. Nobody is an engineer anymore. Engineering is what the fleet does.

**Embrace the em dash**—the scarlet letter of competent AI use—and stop pretending the machine did not help. By the end of 2026, "I typed it all myself"—however proudly delivered—should sound less like craftsmanship and more like "I did the arithmetic without a calculator."

Make voice—the interface management already runs on—the default for delegation. Make agents—the new digital staff—the default for execution. Keep keyboards—for precision, privacy, and correction—where they still win.

The keyboard had a good century—precision still matters—but the microphone gets the promotion.

[^1]: Vivek Dhakal et al., [*Observations on Typing from 136 Million Keystrokes*](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf), CHI 2018.
[^2]: National Institutes of Health, [“Scientists Create Speech Using Brain Signals”](https://www.nih.gov/news-events/nih-research-matters/scientists-create-speech-using-brain-signals), 2019.
[^3]: Sherry Ruan et al., [*Speech Is 3x Faster than Typing for English and Mandarin Text Entry on Mobile Devices*](https://hci.stanford.edu/research/speech/paper/speech_paper.pdf), 2016. The experiment observed 161 WPM for English speech entry and cites prior work showing speech can reach 200 WPM. The 250-WPM row is an illustrative high-speed agent-dictation scenario, not a measured average.
[^4]: Illustrative capacity model, not a measured productivity result. Information throughput is WPM relative to average typing. Each coordinator agent is assumed to require 1,000 words of instructions, corrections, and feedback per hour, so coordinator agents under management = WPM × 60 ÷ 1,000. Each coordinator directs five execution agents, so total agents under management = coordinator agents × 5.