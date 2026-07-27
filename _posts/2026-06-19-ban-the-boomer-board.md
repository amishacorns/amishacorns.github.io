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

| Interface | Words per Minute | Information Throughput | Agents Under Management | Effective Headcount[^7] | Google Labor-Value Gain[^7] |
|---|---:|---:|---:|---:|---:|
| Average typing[^1] | 52 | 1.0x | 3.1 | ~196K | $2.0B |
| Fast typing[^1] | 78 | 1.5x | 4.7 | ~199K | $2.9B |
| Normal speech[^2] | 150 | 2.9x | 9.0 | ~207K | $5.6B |
| Fast AI speech scenario[^3] | 250 | 4.8x | 15.0 | ~218K | $9.4B |

Words per minute is only a proxy for information throughput, but it is a useful one here. A twenty-minute conversation with an agent at 250 words per minute contains about 5,000 words. Even a fast typist needs more than 64 minutes to enter the same amount. That extra bandwidth can become objectives, constraints, examples, and a definition of done. Many prompts are not too difficult; they are too small. People conclude that the agent is limited when the real failure is context starvation. We built machines that can accept millions of tokens and installed a tollbooth in front of them staffed by ten fingers.

Moving millions of annual inputs from fingers to voice may finally force carpal tunnel to find another line of work.

Alphabet is only a convenient yardstick. The final two columns scale a conservative 14 percent measured productivity result with interface throughput, using the 250-WPM scenario as the full productivity benchmark.[^4][^5][^7] They are not forecasts: effective headcount means equivalent output, and labor-value gain is neither savings nor profit. The separate 40 percent writing result is excluded because it measures task-time reduction on bounded writing work—not a company-wide productivity rate.[^6] The point is the order of magnitude: a company this large can plausibly leave billions of dollars per year on the table by throttling agentic workflows through low-bandwidth interfaces.

The opportunity is not merely dictating the same email faster. It appears when voice is paired with systems capable of executing intent: research the customer, draft the email, update the CRM, propose three follow-ups, and return only for approval. The keyboard accelerates characters. The agent accelerates outcomes.

The post-agentic office should resemble high-level management: people are in meetings all day, but the meetings are with agents instead of humans. Work becomes a continuous cycle of delegation, review, correction, and approval.

Everyone becomes a manager. Nobody is an engineer anymore—or, more precisely, "engineer" stops describing the unit of work. Teach people to delegate objectives, context, constraints, and success criteria aloud, then evaluate completed work, cycle time, errors, and rework. Leadership should model the behavior.

**Embrace the em dash**—and stop treating competent use of AI as something to hide—because subtlety has already left the building. By the end of 2026, "I typed it all myself"—however proudly delivered—should sound less like craftsmanship and more like "I did the arithmetic without a calculator."

Make voice—the interface we were born with—the default for high-level creation and delegation. Make agents—the tireless little creatures—the default for multi-step execution. Keep keyboards—for precision, correction, code review, privacy, and nostalgia—whenever they are genuinely the better instrument.

The Boomerboard can remain on every desk—beautiful, familiar, and demoted—but only next to a microphone.

[^1]: Vivek Dhakal et al., [*Observations on Typing from 136 Million Keystrokes*](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf), CHI 2018.
[^2]: National Institutes of Health, [“Scientists Create Speech Using Brain Signals”](https://www.nih.gov/news-events/nih-research-matters/scientists-create-speech-using-brain-signals), 2019.
[^3]: Sherry Ruan et al., [*Speech Is 3x Faster than Typing for English and Mandarin Text Entry on Mobile Devices*](https://hci.stanford.edu/research/speech/paper/speech_paper.pdf), 2016. The experiment observed 161 WPM for English speech entry and cites prior work showing speech can reach 200 WPM. The 250-WPM row is an illustrative high-speed agent-dictation scenario, not a measured average.
[^4]: Alphabet, [2025 Annual Report](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm).
[^5]: Erik Brynjolfsson, Danielle Li, and Lindsey R. Raymond, [*Generative AI at Work*](https://www.nber.org/papers/w31161), 2023.
[^6]: Shakked Noy and Whitney Zhang, [“Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence”](https://doi.org/10.1126/science.adh2586), 2023.
[^7]: Illustrative model, not an empirical causal estimate. Information throughput is WPM relative to average typing. Each managed agent is assumed to require 1,000 words of instructions, corrections, and feedback per hour, so agents under management = WPM × 60 ÷ 1,000. Modeled productivity lift = 14% × WPM ÷ 250. Effective headcount = 190,820 × (1 + modeled productivity lift). Google labor-value gain = $67.202 billion × modeled productivity lift. Alphabet does not disclose a Services-and-Cloud-only headcount, so the headcount and compensation columns use different scopes and should be read as separate illustrations.