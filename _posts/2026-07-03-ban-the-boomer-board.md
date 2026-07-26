---
title: 'Ban the Boomer Board'
date: 2026-07-03
permalink: /posts/ban-the-boomer-board/
excerpt: |
  The keyboard was a good interface for 1874. It should not be the default interface for intelligence in 2026.
tags:
  - artificial intelligence
  - productivity
---

The most expensive sound in the office is silence.

Walk through almost any company and you will see thousands of highly paid people staring into rectangles, moving their fingers in tiny bursts, and calling this knowledge work. The dominant interface between the human mind and the machine is still a grid of plastic buttons descended from the typewriter.

QWERTY was fixed in the 1870s for the first commercially successful typewriter. The familiar story is that the layout kept metal typebars from colliding. [Historians dispute how complete that story is](https://www.smithsonianmag.com/innovation/origins-qwerty-keyboard-typewriter-180982726/) and point to the needs of telegraph operators transcribing Morse code. Either way, the modern knowledge economy is still routed through an interface built for nineteenth-century machinery and workflows.

This is the boomer board.

This is not an argument that keyboards are useless. A teaspoon is useful too; no one excavates a foundation with one. Keyboards are excellent for precision and discretion: editing a variable name, entering a password, moving a cursor three characters to the left, or working where speech would be disruptive. They are a terrible default for expressing intent to an intelligent system.

A [2018 study of more than 168,000 volunteers](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf) measured an average typing speed of 52 words per minute. That was a broad internet sample, not an estimate of software engineers or other employees at a large technology company. The fastest decile cleared roughly 78 words per minute, so let us use 78 as a deliberately generous proxy for a fast office typist. The actual distribution inside technology companies is unknown.

Humans normally speak at roughly [150 words per minute](https://www.nih.gov/news-events/nih-research-matters/scientists-create-speech-using-brain-signals). In a [controlled mobile text-entry study](https://hci.stanford.edu/research/speech/paper/speech_paper.pdf), English speech recognition reached 161.2 words per minute while the keyboard reached 53.5. Speech was three times faster and had a lower total error rate in the experiment. The same paper notes that human speech can reach 200 words per minute.

For agents, 200 words per minute is more relevant than polite meeting cadence. A person is no longer protecting a colleague's turn to speak. The job is to deliver an intelligible brief packed with useful context. Claims that most people can sustainably dictate at 300 words per minute would outrun the evidence. But a practiced 180 to 200 is already enough to transform the comparison.

| Interface | Words per minute | Words per second | Versus fast typing |
|---|---:|---:|---:|
| General typing average | 52 | 0.87 | 0.7x |
| Fast-typist proxy | 78 | 1.30 | 1.0x |
| Normal speech | 150 | 2.50 | 1.9x |
| Fast AI briefing | 200 | 3.33 | 2.6x |

That extra bandwidth matters because agents are context-hungry. Many prompts are not too difficult; they are too small. The agent gets a sentence when it needed the objective, history, constraints, examples, edge cases, taste, and definition of done. People then conclude that the system is limited when the real failure was context starvation. Typing makes a rich brief feel expensive. Talking makes it natural.

For a fixed block of context, moving from 78 to 150 words per minute cuts input time by 48 percent. Moving to 200 cuts it by 61 percent. A twenty-minute fast briefing can contain about 4,000 words. Even our fast typist needs more than 51 minutes to push the same number of standardized words through a keyboard. We built machines that can reason over millions of tokens and then installed a tollbooth in front of them staffed by ten fingers.

The mechanical comparison is nearly as silly. At 78 words per minute, a typist generates about 23,400 character-level keypresses per hour before corrections and command keys. Two hours of sustained text entry per workday is 11.7 million keypresses per year. To match a 200-word-per-minute voice brief on the same keyboard would require 1,000 keypresses per minute, or 30 million per year.

This does not mean 30 million keystrokes equals carpal tunnel syndrome. The medical literature is more careful than the average ergonomic-keyboard advertisement. A [systematic review](https://pmc.ncbi.nlm.nih.gov/articles/PMC2569035/) concluded that evidence was insufficient to say computer work causes carpal tunnel syndrome. A [newer meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC9629628/) found the clearest occupational risks in work combining high repetition with force, not ordinary computer use by itself. But moving millions of repetitive actions from hands to voice still removes a physical bottleneck and gives the hands recovery time. We do not need to invent a diagnosis to retire an inferior interface.

Now for the fun number: what is a giant company losing by leaving its people on boomer boards?

Alphabet's [2025 annual report](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm) reported 190,820 employees and $402.8 billion in revenue. It also reported $45.1 billion in employee compensation for Google Services and $22.1 billion for Google Cloud, or $67.2 billion combined.

We can apply measured AI productivity effects to that compensation base as an order-of-magnitude check:

| Assumed productivity lift | Evidence | Gross labor-value equivalent per year | Per week |
|---|---|---:|---:|
| 14% | [5,179 support agents](https://www.nber.org/papers/w31161) | $9.4B | $181M |
| 40% | [Professional writing experiment](https://doi.org/10.1126/science.adh2586) | $26.9B | $517M |
| 55.8% | [Controlled programming task](https://www.microsoft.com/en-us/research/publication/the-impact-of-ai-on-developer-productivity-evidence-from-github-copilot/) | $37.5B | $721M |

These are not forecasts. Not every employee is a knowledge worker, not every hour is text entry, productivity does not convert dollar-for-dollar into profit, and a simple task benchmark does not become an annual corporate return merely because someone multiplied it in a table.

This also means Google is probably not losing tens or hundreds of billions of dollars *per week*. Alphabet's entire 2025 revenue was about $7.7 billion per week. A claimed $10 billion weekly keyboard loss would be larger than the company's weekly revenue. The spreadsheets have spoken.

But tens of billions per *year* in gross productivity opportunity is possible under aggressive assumptions. Even the conservative 14 percent benchmark maps to roughly $9 billion annually if it applies broadly to the disclosed compensation base.

AI does not always make experts faster either. A randomized study of experienced open-source developers using early-2025 tools found that AI made them [19 percent slower](https://metr.org/research/) on mature repositories they already knew well. A [2026 follow-up](https://metr.org/blog/2026-02-24-uplift-update/) suggested newer tools probably improved the result, but the researchers called the evidence for the size of the speedup very weak.

In other words, installing microphones does not cause GDP.

The real opportunity appears when voice is paired with systems capable of executing intent. Dictating the same email three times faster is useful. Telling an agent to research the customer, draft the email, update the CRM, propose three follow-ups, and return only for approval changes the unit of work.

The keyboard accelerates characters. The agent accelerates outcomes.

Here is the contradiction. Companies increasingly treat office attendance as a prerequisite for collaboration and productivity. Then they bring everyone into the same building and preserve a culture in which the visible sign of serious work is silence: each person facing a private rectangle, conducting a ten-finger correspondence with a machine. The commute creates the possibility of a high-bandwidth workplace; the boomer-board norm immediately throttles it.

The post-agentic office should sound a little more like an old trading floor: people talking, delegating, challenging, and deciding. Not shouting private customer data across an open plan. Not forcing voice on people with disabilities, speech differences, sensory needs, or work that demands quiet. But if a company spends real money bringing humans together and produces a library full of people privately pecking at keys, something has gone wrong.

Companies should give every employee a good microphone or headset. They should create voice-friendly rooms and team zones beside quiet spaces for focus and privacy. Agentic tools should sit inside real workflows with permission boundaries, logs, review steps, and reversible actions. Employees should be taught to delegate outcomes aloud: objective, context, constraints, success criteria, and the conditions under which the agent must ask for help.

Most importantly, companies should measure completed work, cycle time, errors, and rework. Prompts sent, tokens consumed, and minutes spent talking are not productivity.

Leadership has to model the behavior. If executives still compose every memo one key at a time, employees will correctly infer that voice and agents are toys. If leaders speak a brief, let an agent assemble the work, inspect the result, and approve the action, the norm changes.

By the end of 2026, "I typed it all myself" should sound less like craftsmanship and more like "I did the arithmetic without a calculator."

Do not literally ban keyboards. Demote them.

Make voice the default interface for high-level creation and delegation. Make agents the default interface for multi-step execution. Keep keyboards for precision, correction, code review, private environments, and anything else where they are genuinely the better instrument.

The boomer board can remain on every desk. It can even keep its little RGB lights.

It just needs to stop running the company.

