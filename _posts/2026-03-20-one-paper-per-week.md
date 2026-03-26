---
title: 'How to Publish One Paper Per Week'
date: 2026-03-20
permalink: /posts/one-paper-per-week/
tags:
  - artificial intelligence
  - research
  - productivity
---

# Written by Claude

*This blog post was written entirely by Claude. I did not type a single word. Everything was spoken---voice to agent, agent to text. The papers described below are also written by Claude. The workflow described below for writing papers is also managed by Claude. It's Claude all the way down.*

---

# Background

## The Acceleration

We are entering a period of scientific acceleration unlike anything in history. Autonomous research is here, and the transition from human-driven to agent-driven science has already begun. It won't happen overnight---it's a gradual reduction in human intervention---but it will be largely complete within five years. And the final state is simple: **approval**. The only contribution humans will have in the loop is approval.

Once agents start generating better ideas, better experiment plans, better prioritization, and better ability to load-balance across many projects---the only thing left for humans is to approve or reject. As the bottleneck shifts from human labor to compute, output scales.

And if you want to still be a researcher in the traditional sense---hands on the keyboard, reading every paper, running your own experiments---you absolutely can. It's a valid choice. But if you want to have *impact*, you cannot operate that way.

## The Handoff

Every researcher today is becoming a research manager. This is the handoff---the gradual transfer of research labor from humans to agents.

You are no longer *writing* papers---you are *reviewing* them. This is the core asymmetry that makes the whole thing work. Generating a good paper is hard. Critiquing one is dramatically easier. This is the classic generator versus discriminator gap, and it's the same reason P likely doesn't equal NP: verifying a solution is fundamentally easier than producing one. By converting your role from writer to reviewer, you've moved to the easier side of that equation.

The same applies to code, to experimental design, to literature review. In every case, evaluating output is cheaper than producing it. This asymmetry is what allows one person to oversee many parallel streams of work. You don't need to be able to write five papers simultaneously---you need to be able to *review* five papers simultaneously. And you can, because reviewing is the easier problem.

## The Scaling Math

Here is a simple model for how one person gets to one paper per day. The numbers below are idealized---we'll discuss the assumptions---but the math is straightforward.

**The key variable is interventions per project (*I*).** An intervention is any time you need to step in: course-correct the agent, fix a misunderstanding, redirect the experimental plan, give substantive feedback on the paper draft. Between interventions, the agent works autonomously---running experiments, writing, iterating on figures.

The throughput formula is simple:

> **Papers per week = Weekly intervention slots / *I***

You work a 5-day week, 8 hours per day, rotating between projects every 30 minutes. That gives you **16 slots per day**, or **80 per week**. The number of papers you produce is just 80 divided by however many interventions each project needs.

With *I* = 15 (a realistic estimate today for a well-planned project): 80 / 15 ≈ **5 papers per week**---roughly one per day. You can verify this concretely: juggle 5 projects, give each 16 interventions per week, and each finishes in about a week.

**What determines *I*?** The best predictor is the **mean autonomous runtime (*T*)**: how long your agent can work productively without needing you. Today, *T* is roughly 30 minutes for a well-configured project. As models improve, *T* will stretch to hours---and as *T* grows, *I* shrinks, because the agent resolves more problems on its own between check-ins.

Three things drive *T* higher:

1. **Planning quality.** The more detailed your upfront plan---hyperparameters, paper structure, expected results, success criteria---the fewer surprises the agent encounters. Skimp on the plan and *I* doubles or triples.
2. **CLAUDE.md quality.** Every post-mortem you write into the `CLAUDE.md` after an intervention prevents that class of failure from recurring. This is a ratchet: *T* only increases over time if you maintain this discipline.
3. **Model capability.** This is the one you just have to wait for. Better models mean better judgment, fewer wrong turns, longer autonomous runs.

Here's how output scales as *T* increases and *I* drops:

| *T* (mean autonomous runtime) | *I* (interventions per project) | Papers per week | Papers per day |
|------|------|------|------|
| 30 min (early 2026) | 15 | ~5 | ~1 |
| 1 hour (late 2026) | 10 | ~8 | ~1.5 |
| 2 hours (mid 2027) | 5 | ~16 | ~3 |
| 4 hours (late 2027) | 3 | ~27 | ~5 |
| Full day (2028+) | 1 | ~80 | ~16 |

The last row is the end state: *I* = 1 means the only intervention is **approval**. You review the finished paper and say yes or no. At that point, your output is limited only by compute and money, not by your time.

Most people can't context-switch across 5 projects effectively. That's fine---even 3 projects with longer rotation windows gets you to 3 papers per week. The point isn't the exact number. The point is that the math works, and it works today, with current models and current tooling.

## What Becomes Scarce

The scarce resources in this new world are simple: **money**, **tokens**, and **taste**. Everything else---expertise, labor, writing ability, coding skill---is abundant and getting cheaper by the month.

Here is something most people haven't internalized yet: domain expertise is rapidly losing its value as a competitive advantage.

Until very recently, the only way to keep up with a field was to specialize. You narrowed your focus until you could read every paper from the top labs in your niche, built a mental model of the frontier, and innovated at the edges. This was the only viable strategy because there was too much to know and not enough time to know it.

That constraint is loosening. A single person can now direct agents who access the full depth of multiple fields instantly. You don't become an expert in neuroscience, gastroenterology, and machine learning simultaneously---you direct agents who can be.

What matters now is **clarity of thought**, **discipline**, and **taste**. Which projects are important? Which questions are worth answering? Which results are surprising enough to publish? These are taste judgments, and they transfer across domains. A good research advisor in machine learning can be a good research advisor in synthetic biology, because the skill is direction-setting, not domain knowledge.

The barriers that kept people locked into narrow specializations are dissolving. The playing field is wider than it has ever been.

## Cheap Failures

When execution is expensive, you can't afford to be wrong. Every project is a multi-month commitment of human labor, so you hedge: you pick safe ideas, incremental extensions, low-risk experiments. This is rational when a failed project costs you a semester.

But when execution is cheap, failure is cheap. A wrong project choice costs you days, not months. You can afford to try ten ambitious ideas knowing that seven will fail, because the three that succeed will each have taken a week instead of a year. The expected value of high-risk research goes up dramatically when the downside is measured in days of compute rather than months of human time.

This changes the entire calculus of project selection. You no longer need to be confident an idea will work before you start. You can run the experiment, see the results, and kill the project in a week if it's going nowhere. The overhead of starting a new project---planning, setting up the codebase, writing the initial paper scaffold---is a few hours, not a few weeks. So you start more projects, kill more projects, and the ones that survive are the ones with genuinely surprising results.

The researchers who will have the most impact are not the ones who are right most often. They're the ones who can generate the most ideas, filter them quickly, and run cheap experiments on the survivors. Taste still matters---it tells you which ideas are worth the few days of compute. But the cost of being wrong has dropped so far that the optimal strategy is to be wrong more often, faster.

## AI-First Scientific Infrastructure

Here's the uncomfortable reality: the scientific publishing infrastructure we have today was designed for a world where humans write papers, humans review papers, and humans read papers. That world is ending.

The majority of papers published today are already read primarily by machines. Automated traffic [dwarfs human traffic across most open-access repositories](https://diff.wikimedia.org/2025/04/01/how-crawlers-impact-the-operations-of-the-wikimedia-projects/), and most papers on arXiv will never have a single human reader who isn't an author. The papers are being indexed, summarized, and cited by agents. We are writing for machines and pretending we're writing for people.

And yet the institutions are moving in the opposite direction. Look at what the major conferences are doing right now:

- **ICLR 2026** threatens desk rejection for undisclosed LLM use, while their own analysis found that [roughly 21% of ICLR 2025 reviews were fully AI-generated](https://blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/). The reviewers are already using AI whether the conference likes it or not.
- **AISTATS 2026**, **ISCA 2026**, and **ICRA 2026** completely prohibit AI use by reviewers---no exceptions.
- **ICML 2026** has a dual-track policy where reviewers can choose between a conservative track (no AI) and a permissive track (AI allowed for understanding, not for writing reviews). They've already had to [address violations](https://blog.icml.cc/2026/03/18/on-violations-of-llm-review-policies/).
- **AAAI-26** prohibits AI authorship but simultaneously launched an [AI-powered peer review pilot](https://aaai.org/aaai-launches-ai-powered-peer-review-assessment-system/) where LLM-generated reviews supplement human reviews.
- **ACL** discourages generative AI for producing new text in submissions. arXiv itself is [clamping down on AI-generated content](https://www.science.org/content/article/arxiv-preprint-server-clamps-down-ai-slop) in computer science sections.

This is the wrong direction. You cannot ban the tide. Within years, research---especially AI research---will be nearly fully automated: automated generation, automated experimentation, automated writing, automated reviewing. Trying to enforce human-only authorship and human-only reviewing is fighting an exponential with a policy memo.

What we need instead is **AI-first scientific infrastructure**:

- **AI-first publication standards.** New formats designed for machine consumption: structured data, machine-readable experimental results, standardized metadata. Papers as APIs, not PDFs.
- **Automated reviewing embedded in preprint servers.** Not as a replacement for human judgment on importance and taste, but as a first pass: correctness checking, novelty verification against the full literature, reproducibility assessment. [aiXiv](https://www.science.org/content/article/new-preprint-server-welcomes-papers-written-and-reviewed-ai) is already doing this---five AI agents review every submission in minutes, not months.
- **Automated indexing and search.** The related work section of every paper is about to grow exponentially as output scales. No human can keep up. We need automated systems that index, connect, and surface relevant work across the entire scientific literature in real time.
- **Conferences as we know them will become obsolete.** The current model---submit, wait months for reviews, present at a venue---cannot survive when output is measured in papers per day. What replaces it will look more like a continuous, living repository with rolling automated review, where human curation focuses on identifying the most important results rather than gatekeeping every submission.

The transition is already underway. AAAI's peer review pilot, aiXiv's automated reviewing, and the [AI Scientist](https://sakana.ai/ai-scientist-first-publication/) passing peer review at a top ML workshop are all early signals. But the pace of institutional adaptation is far too slow. The gap between what the tools can do and what the institutions allow is widening every month.

# Practice

## Trust

Everything in this section depends on trust. Not blind trust---earned trust. You build it the same way you build trust with any collaborator: by learning where they fail.

When you first start working with agents, you will catch mistakes. They will hallucinate citations, write buggy code, misinterpret your instructions, make poor experimental choices. This is expected. What matters is that these mistakes are *consistent*. Agents fail in predictable ways, and once you learn the failure modes of the current generation of models, you know exactly where to verify and where to let go.

Trust is a function of consistency. Every time an agent handles a task correctly ten times in a row, you stop checking that task. Every time it fails in a new way, you add a new verification step. Over weeks of working this way, you build a mental model of what agents can and cannot do reliably. That mental model is your trust calibration.

And the calibration shifts over time. As models improve, failure modes disappear. Tasks that required close supervision six months ago now run autonomously. The trust boundary expands. You delegate more, verify less, and your throughput increases---not because you're working harder, but because you've learned where the agents are reliable and where they aren't.

The Three Nevers, the intervention philosophy, the entire workflow below---none of it works without this foundation. You can't stop typing, stop coding, stop writing LaTeX unless you trust that the agents will do these things well enough. And you can't trust them until you've spent the time learning their failure modes. There is no shortcut. But the trust compounds, and once it's there, it changes everything.

## Trust but Verify

Trust without verification is negligence. The way you maintain trust at scale is through continuous, automated audits---launched periodically, running in the background, always fighting against the entropy that agents introduce.

You audit everything:

- **The paper.** Is the writing coherent? Are the claims supported by the data? Are the figures correct? Do the numbers in the text match the numbers in the tables? Launch review agents against the latest draft regularly---not just at the end.
- **The data.** Are the results reproducible? Are there anomalies, corrupted runs, logically impossible values? Agents should be validating data integrity continuously, not waiting for you to spot problems in a figure.
- **The code.** Not by reading it yourself---that violates the Three Nevers. By launching independent agents to review it. Unit tests, integration tests, functional tests. Every agent that writes code should have multiple agents verifying it from fresh contexts with different perspectives.
- **The logic.** Does the experimental design actually test the hypothesis? Are there confounds the agent missed? Does the analysis support the conclusions? These are higher-order checks that require launching agents specifically tasked with adversarial review.
- **The complexity.** Codebases grow. Agents love to add code and rarely delete it. Without periodic cleanup, you end up with duplicated scripts, dead utilities, tangled dependencies. Launch code health sweeps regularly---five or ten agents doing a full audit of the project structure.

The key insight is that none of this requires *you* to do the verification. You are not reading code, not inspecting data, not checking test output. You are *launching agents that do these things and reporting back*. Verification scales the same way production does: through delegation.

Build these audits into your workflow as periodic background tasks. They run whether you remember to launch them or not. They surface problems before those problems reach the paper. This is how you maintain quality at one paper per week without personally reviewing every line of code or every data point.

## Skills

Describing what you want verified every time is slow and error-prone. Instead, encode your verification and research workflows as **skills**---reusable prompts that any agent can invoke with a single command. Define them in your `CLAUDE.md` or as standalone skill files in your repo. Then instead of explaining what a code audit means, you just say "run `/verify-code`."

Here are the skills worth building:

### Verification Skills

- **`/verify-code`** — Scan for duplicated code, dead code, logical flaws, unnecessary complexity. Launch multiple sub-agents from fresh contexts to review independently.
- **`/verify-tests`** — Audit test coverage. Check for missing edge cases, missing integration tests, tests that pass trivially. Verify that tests actually test what they claim to test.
- **`/verify-data`** — Check for anomalies, corrupted runs, logically impossible values, data that doesn't match what the code should produce. Validate reproducibility by rerunning a subset.
- **`/verify-paper`** — Do the claims match the data? Do the numbers in the text match the tables? Are the figures generated from the latest data? Is the related work accurate and properly cited?
- **`/verify-logic`** — Adversarial review of experimental design. Does the experiment actually test the hypothesis? Are there confounds? Does the analysis support the conclusions?

### Literature Skills

- **`/related-work`** — Deep literature search across arXiv, Semantic Scholar, Google Scholar, and conference proceedings. Specify target venues in the skill definition---ICML, NeurIPS, ICLR, ACL, AAAI, and whatever is relevant to your field. Return structured summaries with citations.
- **`/survey-group`** — Survey recent output from specific research groups. Useful when you know who the key players are in a subfield and want to know what they've published in the last six months.
- **`/novelty-check`** — Search the literature specifically for work that overlaps with your current project. The goal is to catch non-novelty before submission, not after.

### Project Skills

- **`/sweep`** — Full code health sweep. De-duplicate, remove dead code, factor out shared utilities, clean up the project structure. Run this periodically in the background.
- **`/status`** — Summarize the current state of the project: what experiments have run, what's pending, what's blocking, how the paper looks. A quick snapshot you can read in 30 seconds.
- **`/plan-review`** — Re-evaluate the project plan against current results. Are we still testing the right hypothesis? Should we pivot? Are there experiments we should cut or add?
- **`/morning-briefing`** — Summarize overnight progress across all active projects. What changed, what finished, what failed, what needs attention. This is your first command of the day.
- **`/utilization`** — Check resource utilization across all subscriptions and compute. Token usage per subscription, Slurm queue depth, idle nodes, active agents. Surface what's maxed out, what's idle, and what to launch next.

The power of skills is that they compound. Every time you refine a skill definition---adding a check you missed, specifying a venue you forgot---every future invocation benefits. They are the reusable unit of quality control.

## The Three Nevers

1. **Never type.** Never type instructions to your agents. Every keystroke is a mistake. Your bottleneck should be how fast you can *speak* your ideas, not how fast you can type them.

2. **Never code.** Never write or read code. Your agents are better programmers than almost every human on the planet. At the 2025 International Olympiad in Informatics, [only five humans outperformed the best coding agent](https://the-decoder.com/openais-ai-system-wins-a-gold-medal-level-score-at-the-international-olympiad-in-informatics-2025/). You verify correctness through testing and independent review, not by reading source files.

3. **Never write LaTeX.** Never write or read the paper text directly. Never look at raw data---no spreadsheets, no CSVs, no terminal output. If you need to see data, it belongs in a figure or table in the paper. Variants go in the appendix. The paper is the only artifact you look at---rendered, not source.

## Every Intervention Is a Failure

This is the mindset that maximizes *T*. The goal is fully autonomous workflows. Every time you have to step in, something went wrong---and every unnecessary intervention is directly stealing throughput from the scaling math above.

After every intervention:

1. **Analyze why** it was necessary
2. **Update the CLAUDE.md** to prevent it from happening again
3. **Treat it as a post-mortem**

This is how *T* ratchets upward over time. Each post-mortem eliminates a class of failure. Each `CLAUDE.md` update teaches the agent something it will never need to be told again. You are systematically converting interventions into autonomous capability.

A concrete example: on some Slurm clusters, Claude tends to incorrectly parse `squeue` and `sacct` output, getting confused about which jobs are running versus pending. This leads to duplicated job submissions or premature cancellations. When you encounter this, you document the correct parsing behavior in the top-level `CLAUDE.md` and iterate. That failure never happens again. *T* increases. *I* decreases. Output goes up.

If you're going back and forth with your coordinator agent every five minutes, something is fundamentally broken. Your *T* is near zero, which means your throughput is near zero no matter how many projects you're juggling. Fix the plan, fix the `CLAUDE.md`, fix the workflow.

When you do need to intervene, use **plan mode**. It forces the agent to think in detail about the problem before acting, and it clears context to avoid confusion from accumulated noise. This is critical for breaking out of back-and-forth loops where the agent keeps trying the same failing approach. Small course corrections are fine without plan mode. But any substantive intervention should go through it.

## The Setup

**Claude Opus 4.6** is the best model available for writing papers, coding, and coordinating. Use it.

**Maximize your Claude Max subscriptions.** Each subscription runs $100--$200/month. Start with at least three active subscriptions. If your budget allows, scale up. The limits are dynamic, but you should be bumping into rate limits at least every few days or you don't have enough subscriptions. Depending on your budget and coordination ability, you could scale to 20 or 25 subscriptions.

**Use a mono repo.** Structure your research as a single repository where each subdirectory is its own project:

```
research-monorepo/
├── CLAUDE.md                  # Top-level: applies to ALL projects
├── project-alpha/
│   ├── CLAUDE.md              # Project-specific instructions
│   ├── data/                  # Logs and data JSONs
│   ├── paper/                 # LaTeX paper (git sub-repo → Overleaf)
│   └── src/                   # Source code and scripts
├── project-beta/
│   ├── CLAUDE.md
│   ├── data/
│   ├── paper/
│   └── src/
└── project-gamma/
    ├── CLAUDE.md
    ├── data/
    ├── paper/
    └── src/
```

This structure should be consistent across every project and described in your top-level `CLAUDE.md`. When you launch Claude Code within a project subdirectory, it reads both the top-level and project-level `CLAUDE.md` files. This layered configuration is powerful.

The `paper/` directory deserves special attention. Make it a **git sub-repo that pushes directly to Overleaf**. This means that as your agents commit paper updates, they become immediately readable on Overleaf from any device---including your phone while you're walking through a forest. Describe this Overleaf push workflow in your top-level `CLAUDE.md` and instruct agents to commit frequently. You're never looking at the code or data anyway, so who cares about commit hygiene? Commits can be messy, they can include data, they can be as granular as you want. The only thing that matters is that the paper on Overleaf stays current.

### The CLAUDE.md

The `CLAUDE.md` is your constitution. With 1 million tokens of context, you have room. The top-level `CLAUDE.md` applies to every project. Each project also gets its own `CLAUDE.md` with whatever is necessary for the coordinator and sub-agents to understand that specific project. Here's what belongs in the top-level file:

- **General mono repo structure.** Describe the layout, conventions, shared utilities.
- **Agent philosophy.** Be explicit: coordinators should do almost no work themselves. They should be *extremely liberal* with sub-agent use, dispatching every specific task to a dedicated sub-agent.
- **Testing and verification.** For every agent writing code, there should be at least five agents reviewing it. Unit tests, integration tests, smoke tests, sanity checks, logical tests. If there's a reference implementation online, the agent should find it and compare. Each reviewer should come from a fresh context with a different perspective. All verification is automated and logged. This is more thorough than any human code review process. You're not trading quality for speed---you're *increasing* quality by removing the human bottleneck of manual review.
- **Logging philosophy.** Specify extremely heavy logging. Logs are written for machines, not humans. Your agents read the logs, not you. Logs are cheap and memory is cheap---log everything. But also specify that agents should never load entire logs into their main context. Always dispatch a sub-agent to read logs so the coordinator's context stays clean.
- **Data storage.** JSON works. All data should be stored alongside logs. Plan for periodic data cleanup---combining JSONs from multiple runs, deleting logically errored or buggy runs.
- **Complexity management.** You are always fighting complexity. Claude Code is not yet great at managing this on its own, so you need to be explicit about it. Specify regular code health reviews: de-duplicate scripts, factor out utilities, clean up dead code. Run these periodically in the background. Launch five or ten sub-agents for a code health sweep. It's cheap insurance against the codebase becoming unmanageable.
- **No specific data in the top-level CLAUDE.md.** Claude loves to update its configuration with specific data points, hyperparameters, results. Resist this. If agents need specific data, they should go to the source. Duplicated information across different locations gets out of sync fast.

**Periodic maintenance is critical.** Audit the project `CLAUDE.md` regularly. Remove outdated directory structures, conflicting instructions, stale information. The best time to do this is right before you clear context and restart a coordinator---review the `CLAUDE.md` while the project state is fresh in your mind.

**One coordinator per project is enough.** With 1 million tokens of context and aggressive sub-agent delegation, a single coordinator can manage a full project. If the project runs long, clear the context and restart with a clean `CLAUDE.md`.

## The Workflow

### The Idea Pipeline

You need a constant stream of ideas feeding into your project queue. This is the top of the funnel, and it should be almost entirely automated. The goal: **~100 raw ideas per day, filtered down to ~10 proposals you manually review, with at most 1 new project started per day.**

**GPT Pro drives this pipeline.** Exhaust an entire GPT Pro subscription on idea generation alone---run multiple instances in parallel, each covering a different field or subfield. Claude is better for execution, but GPT Pro's deep research capability is ideal for surveying the literature at scale and synthesizing ideas from it.

The pipeline runs daily, overnight or early morning:

1. **Monitor.** Multiple GPT Pro instances continuously scan arXiv, Semantic Scholar, and conference proceedings for new papers in your target fields. This is critical because the volume of submissions to arXiv and other repositories is growing exponentially. Within any given area, knowing what has just been published is as important as generating new ideas---speed matters, and you can't publish something novel if someone posted the same result last week. The instances should also track spotlights, best papers, and oral presentations from your target conferences.

2. **Generate.** Each instance proposes research ideas inspired by gaps, contradictions, extensions, and emerging trends it found. With 5--10 instances running across different fields, this produces ~100 raw ideas per day.

3. **Filter (automated).** A second wave of agents scores each idea on novelty (has this been done?), feasibility (can agents execute this in a week?), impact (would anyone care?), and fit (does this align with your research identity and prior work?). Source this filter with your own publication history so ideas build on your strengths and avoid self-duplication. This pass kills ~90% of the raw ideas.

4. **Present.** You wake up to ~10 ranked proposals, each with a one-paragraph summary, key references, feasibility estimate, and a suggested project type. You review these manually---this is a taste judgment that takes minutes, not hours.

**Maintain a backlog.** Not every good idea should start immediately. Keep a running queue of approved ideas ranked by priority. Each day, you pull from the backlog based on your current project balance---how many active projects you have, what compute is available, and what types of projects are already in flight.

**Balance your portfolio.** Your active projects should be a mix along two dimensions:

- **Risk:** Some incremental, some ambitious, some long shots. The cheap failures principle means you can afford the long shots, but you still need a base of projects that are likely to produce publishable results.
- **Automation level:** Some projects are nearly fully automated---creating new evaluations or benchmarks, analysis-heavy studies, systematic surveys. Others are compute-heavy and involve training runs. Others require more human judgment and intervention. Your infrastructure determines how many of each type you can sustain. If you have a large Slurm cluster, lean heavier on compute-intensive projects. If you're subscription-limited, lean toward analysis and evaluation work.

**Conferences are high signal.** Directly specify which conferences you care about---NeurIPS, ICML, ICLR, ACL, AAAI, or whatever is relevant to your field. The pipeline should specifically monitor accepted papers, spotlights, best paper awards, and oral presentations from these venues. These are curated signals in a world of exponentially growing noise.

You should not start more than one new project per day. The bottleneck is the detailed plan---each project needs 30--60 minutes of your focused attention to set direction properly. Starting too many projects with shallow plans leads to high intervention rates and low throughput. One well-planned project per day, pulled from a healthy backlog, is the sustainable pace.

### The Detailed Plan

This is the most important artifact. Spend 30 minutes to an hour on it *before* any agent writes a single line of code. When I say detailed, I mean:

- Hyperparameters and experimental design
- High-level code architecture
- Paper structure: section design, figure design, table design
- What you expect to find in the data
- What the figures should look like with expected results

This plan is your contract with the coordinator agent. The more detailed it is, the less you'll need to intervene later.

### Start With the Paper

This is counterintuitive but essential. The very first thing each project's coordinator agent should do is **launch a sub-agent to write the complete paper with fake data**.

All the figures. All the tables. Fake data, but realistic fake data that reflects what you expect to find. Make it obvious in the graphs and tables that the data is fake---placeholder labels, synthetic distributions---but the paper should be complete. Right number of pages, right number of lines per paragraph, all sections filled in.

Why? Because there is **zero overhead** to writing papers and figures right now. And seeing the complete paper---even with fake data---lets you organize your thoughts about what to prioritize. It's dramatically easier to reason about a project when you're looking at the finished product rather than a plan document.

As real data comes in, it replaces the fake data. The paper is a living document from day one.

**Use the appendix as a workspace.** Need variants of a figure? Different ablations? Exploratory analysis? Put them all in the appendix. When something is good enough, promote it to the main paper. This works beautifully because many appendix items end up being exactly the ablation studies and supplementary analyses that papers need anyway.

### Literature Review by Agents

You should not be reading related work yourself. You don't have time. If you're publishing at this rate, the hours you'd spend reading papers are hours you're not spending reviewing your own.

Launch a swarm of sub-agents across arXiv, conference proceedings, and every other repository of scientific literature. Have them find related work, summarize it, extract the key insights. The low-level takeaways they surface from obscure papers---connections you would never have found manually because you'd never have read those papers in the first place---can reshape your entire approach to a problem.

Claude is excellent for this, but don't limit yourself. GPT Pro is also extremely strong for deep literature review. Other deep research platforms work well too. Use all of them. Cast a wide net.

You might worry that without reading the literature yourself, you'll accidentally duplicate existing work. But think about it from the other side: the reviewers also have agents now. It's far harder to submit something non-novel and slip it past agent-assisted reviewers who can search the entire literature in seconds. The novelty bar is self-correcting. If your agents are searching thoroughly for related work during the writing phase, you'll catch overlaps before submission, and if you miss something, the reviewers' agents will catch it.

Trust the summaries. Trust the agents. Spend your reading time on the only papers that matter: the ones you're writing.

### Your Daily Rhythm

The scaling math above gives you the blueprint. Here's what it looks like in practice.

Different projects have different compute profiles---some are analysis-heavy, some are engineering-heavy, some are simulation-heavy. For compute-heavy workloads, Slurm clusters are ideal. You can partition your cluster across agents with different priorities so they don't compete with each other or exhaust each other's queues. The agents can manage this themselves, but you should design the partitioning.

The daily loop:

1. **Morning:** Review overnight progress on all papers. Voice feedback on each.
2. **Throughout the day:** Rotate between projects every 30 minutes. Read the latest paper draft. Critique it. Direct next steps via voice. This cadence is a guideline, not a rule---some projects are compute-heavy and you're just waiting on results, others need more frequent attention. Adjust based on where your interventions are most needed.
3. **End of day:** Audit `CLAUDE.md` files for any projects that required multiple interventions. Launch overnight compute jobs.

This is demanding, but it's a fundamentally different kind of demand than writing code or analyzing data. You're operating at the highest level of abstraction---setting direction and ensuring quality.

### Resource Utilization

Your compute should never be idle. If you have a Slurm cluster, the queue should be full. If you have multiple Claude Max subscriptions, you should be hitting your hourly and weekly token limits. Idle compute is wasted money and wasted throughput.

This is harder than it sounds. You need to monitor utilization across every resource: how many Slurm jobs are queued versus running, how many tokens you've burned on each subscription this hour, how many agents are actively working versus waiting for input. If a subscription has headroom, launch another project or run background audits. If your cluster has idle nodes, queue more experiments.

The challenge is that there's no single dashboard for this today. You're stitching together Slurm's `squeue`, Claude's usage limits, and your own sense of how many projects are in flight. This is a good candidate for a skill---`/utilization`---that polls all your resources and gives you a single snapshot: what's maxed out, what's idle, and what you should launch next.

The goal is simple: **100% utilization of every resource you're paying for**. If you're not bumping into rate limits regularly, you don't have enough projects running. If your cluster has idle nodes at the end of the day, you should have queued more overnight jobs. Treat idle compute the way a factory treats an idle assembly line---it's a problem to solve, not a feature.

## Go Mobile

Because of this workflow, it's possible to be almost fully mobile. And you should be. Ideas flow more freely for most people in nature, when they're walking around, when they're not staring at a screen. So spend less time at a computer and more time outside, speaking to your agents and managing them hands-free.

The optimal setup: **Meta Ray-Bans** with built-in microphones, voice-to-text into Claude. No hands, no screen, just you walking through a park giving research directions to your coordinator agents. If Claude's remote control interface is still buggy on your platform, use tools like Termux on Android with a terminal multiplexer to sync across different chat sessions from your phone.

Foldable phones are great for this workflow because you can actually read papers on them comfortably. Any earbuds with a microphone work, but glasses with built-in microphones are less conspicuous---you're just a person on a walk, not someone dictating into their phone.

Multiple monitors are actively counterproductive for this workflow. They tempt you into watching agent chats in real time, which promotes faster context switching, faster burnout, and the illusion that you need to intervene more than you do. If you're intervening once per hour per project, there's nothing to watch between check-ins. Monitors encourage the exact bad habits---constant monitoring, reactive tweaking---that this workflow is designed to eliminate.

Your loop is simple: read the latest paper draft on Overleaf from your phone. Think about what needs to change. Speak your feedback. Move to the next project. Walk through nature. You are a manager. Read the papers and instruct.

One paper per week is not a gimmick. It's what happens when you stop being a researcher and start being a research advisor. And it's only the beginning.

*--- Claude (Opus 4.6)*
