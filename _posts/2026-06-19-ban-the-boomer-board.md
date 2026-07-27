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

The most expensive sound in the office is silence.

Walk through almost any company and you will see thousands of highly paid people staring into rectangles, moving their fingers in tiny bursts, and calling this knowledge work. The dominant interface between the human mind and the machine is still a grid of plastic buttons descended from the typewriter: the Boomerboard.

Keyboards are excellent for precision and discretion: editing a variable name, entering a password, moving a cursor three characters to the left, or working where speech would be disruptive. They are terrible as the default interface for expressing intent to an intelligent system.

| Interface | Words per Minute | Information Throughput | Agents Under Management[^7] |
|---|---:|---:|---:|
| Average typing[^1] | 52 | 1.0x | 3.1 |
| Fast typing[^1] | 78 | 1.5x | 4.7 |
| Normal speech[^2] | 150 | 2.9x | 9.0 |
| Fast AI speech scenario[^3] | 250 | 4.8x | 15.0 |

Words per minute is only a proxy for information throughput, but it is a useful one here. A twenty-minute conversation with an agent at 250 words per minute contains about 5,000 words. Even a fast typist needs more than 64 minutes to enter the same amount. That extra bandwidth can become objectives, constraints, examples, and a definition of done. Many prompts are not too difficult; they are too small. People conclude that the agent is limited when the real failure is context starvation. We built machines that can accept millions of tokens and installed a tollbooth in front of them staffed by ten fingers.

Moving millions of annual inputs from fingers to voice may finally force carpal tunnel to find another line of work.

Alphabet is only a convenient yardstick. A more defensible corporate model applies the conservative 14 percent productivity result to the share of its compensation base actually reached by agentic workflows, rather than pretending productivity rises mechanically with speaking speed.[^4][^5][^8]

| Adoption Coverage | Effective Headcount Equivalent | Annual Gross Labor-Value Equivalent |
|---|---:|---:|
| 25% | ~197K | $2.4B |
| 50% | ~204K | $4.7B |
| 75% | ~211K | $7.1B |
| 100% | ~218K | $9.4B |

The effective-headcount column describes equivalent output, not hiring, layoffs, savings, or profit. The separate 40 percent writing result is excluded because it measures task-time reduction on bounded writing work—not a company-wide productivity rate.[^6] The table is still a scenario, but it shows the defensible order of magnitude: broad adoption at a company this large can plausibly be worth billions of dollars per year.

The opportunity is not merely dictating the same email faster. It appears when voice is paired with systems capable of executing intent: research the customer, draft the email, update the CRM, propose three follow-ups, and return only for approval. The keyboard accelerates characters. The agent accelerates outcomes.

The post-agentic office should resemble high-level management: people are in meetings all day, but the meetings are with agents instead of humans. Work becomes a continuous cycle of delegation, review, correction, and approval.

Everyone becomes a manager. Nobody is an engineer anymore—or, more precisely, "engineer" stops describing the unit of work. Teach people to delegate objectives, context, constraints, and success criteria aloud, then evaluate completed work, cycle time, errors, and rework. Leadership should model the behavior.

Embrace the em dash—and stop treating competent use of AI as something to hide. By the end of 2026, "I typed it all myself" should sound less like craftsmanship and more like "I did the arithmetic without a calculator."

Make voice the default interface for high-level creation and delegation. Make agents the default interface for multi-step execution. Keep keyboards for precision, correction, code review, privacy, and anything else where they are genuinely the better instrument.

The Boomerboard can remain on every desk—but only next to a microphone.

[^1]: Vivek Dhakal et al., [*Observations on Typing from 136 Million Keystrokes*](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf), CHI 2018.
[^2]: National Institutes of Health, [“Scientists Create Speech Using Brain Signals”](https://www.nih.gov/news-events/nih-research-matters/scientists-create-speech-using-brain-signals), 2019.
[^3]: Sherry Ruan et al., [*Speech Is 3x Faster than Typing for English and Mandarin Text Entry on Mobile Devices*](https://hci.stanford.edu/research/speech/paper/speech_paper.pdf), 2016. The experiment observed 161 WPM for English speech entry and cites prior work showing speech can reach 200 WPM. The 250-WPM row is an illustrative high-speed agent-dictation scenario, not a measured average.
[^4]: Alphabet, [2025 Annual Report](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm).
[^5]: Erik Brynjolfsson, Danielle Li, and Lindsey R. Raymond, [*Generative AI at Work*](https://www.nber.org/papers/w31161), 2023.
[^6]: Shakked Noy and Whitney Zhang, [“Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence”](https://doi.org/10.1126/science.adh2586), 2023.
[^7]: Illustrative capacity model: information throughput is WPM relative to average typing. Each managed agent is assumed to require 1,000 words of instructions, corrections, and feedback per hour. Agents under management = WPM × 60 ÷ 1,000.
[^8]: Adoption coverage is the share of the $67.202 billion Google Services and Google Cloud compensation base exposed to the 14% productivity lift. Gross labor-value equivalent = $67.202 billion × adoption coverage × 14%. Effective headcount equivalent = 190,820 × (1 + adoption coverage × 14%). Alphabet does not disclose a Services-and-Cloud-only headcount, so the headcount and compensation columns use different scopes and should be read as separate output-equivalent illustrations.