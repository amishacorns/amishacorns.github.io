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

## The Acceleration

We are entering a period of scientific acceleration unlike anything in history. Autonomous research is here, and the transition from human-driven to agent-driven science has already begun. It won't happen overnight---it's a gradual reduction in human intervention---but it will be largely complete within five years. And the final state is simple: **approval**. The only contribution humans will have in the loop is approval.

Once agents start generating better ideas, better experiment plans, better prioritization, and better ability to load-balance across many projects---the only thing left for humans is to approve or reject. As the bottleneck shifts from human labor to compute, output scales. Conferences will adapt this year. They haven't yet, and it's going to be chaotic, but they will. The review process, the submission formats, the expectations around novelty---all of it will change because it has to.

And if you want to still be a researcher in the traditional sense---hands on the keyboard, reading every paper, running your own experiments---you absolutely can. It's a valid choice. But if you want to have *impact*, you cannot operate that way.

## The Handoff

Every researcher today is becoming a research manager. This is the handoff---the gradual transfer of research labor from humans to agents.

You are no longer *writing* papers---you are *reviewing* them. This is the core asymmetry that makes the whole thing work. Generating a good paper is hard. Critiquing one is dramatically easier. This is the classic generator versus discriminator gap, and it's the same reason P likely doesn't equal NP: verifying a solution is fundamentally easier than producing one. By converting your role from writer to reviewer, you've moved to the easier side of that equation.

The same applies to code, to experimental design, to literature review. In every case, evaluating output is cheaper than producing it. This asymmetry is what allows one person to oversee many parallel streams of work. You don't need to be able to write five papers simultaneously---you need to be able to *review* five papers simultaneously. And you can, because reviewing is the easier problem.

## The Scaling Math

Here is a simple model for how one person gets to one paper per day. The numbers below are idealized---we'll discuss the assumptions---but the math is straightforward.

**The key variable is interventions.** An intervention is any time you need to step in: course-correct the agent, fix a misunderstanding, redirect the experimental plan, give substantive feedback on the paper draft. Between interventions, the agent works autonomously---running experiments, writing, iterating on figures.

Assume the following:

- You juggle **5 projects** simultaneously
- You work a **5-day week**, **8 hours per day**
- You switch between projects every **30 minutes**
- Each project requires roughly **15 interventions** to go from plan to finished paper

That gives you **16 intervention slots per day** (8 hours ÷ 30 minutes), or **80 per week**. Spread across 5 projects, that's **16 interventions per project per week**---more than enough to clear the 15-intervention bar. Each project finishes in roughly one week. Five projects finishing per week is **one project per day**.

The critical assumption here is that agents can work autonomously for at least 30 minutes between your check-ins. Today, that's realistic for well-planned projects with a detailed `CLAUDE.md`. It will only get easier as models improve.

The other critical assumption is planning quality. The 15-intervention estimate assumes careful upfront planning---a detailed experimental design, clear paper structure, explicit success criteria. Skimp on the plan and your intervention count doubles or triples. The time you invest in planning is directly subtracted from the time you spend firefighting later.

Most people can't context-switch across 5 projects effectively. That's fine---even 3 projects with longer rotation windows gets you to 3 papers per week. The point isn't the exact number. The point is that the math works, and it works today, with current models and current tooling.

| When | Output per person | Human role |
|------|------------------|------------|
| Early 2026 | ~1 paper per week | Reviewing, directing, intervening |
| Late 2026 | ~1 paper every 2--3 days | Reviewing, occasional course corrections |
| Mid 2027 | ~1 paper per day | Reviewing summaries, approving directions |
| Late 2027+ | Multiple papers per day | High-level approval only |

## What Becomes Scarce

The scarce resources in this new world are simple: **money**, **tokens**, and **taste**. Everything else---expertise, labor, writing ability, coding skill---is abundant and getting cheaper by the month.

Here is something most people haven't internalized yet: domain expertise is rapidly losing its value as a competitive advantage.

Until very recently, the only way to keep up with a field was to specialize. You narrowed your focus until you could read every paper from the top labs in your niche, built a mental model of the frontier, and innovated at the edges. This was the only viable strategy because there was too much to know and not enough time to know it.

That constraint is loosening. A single person can now direct agents who access the full depth of multiple fields instantly. You don't become an expert in neuroscience, gastroenterology, and machine learning simultaneously---you direct agents who can be.

What matters now is **clarity of thought**, **discipline**, and **taste**. Which projects are important? Which questions are worth answering? Which results are surprising enough to publish? These are taste judgments, and they transfer across domains. A good research advisor in machine learning can be a good research advisor in synthetic biology, because the skill is direction-setting, not domain knowledge.

With iteration times this fast, a wrong project choice costs you days, not months. You can afford to take more risks on project selection because the cost of being wrong has dropped dramatically. But you still want to minimize mistakes---taste is the one thing that doesn't automate away. Compute and tokens are fungible. Taste is not.

The barriers that kept people locked into narrow specializations are dissolving. The playing field is wider than it has ever been.

## The Commandments

1. **Never type, only speak.** Every keystroke is a mistake. Your bottleneck should be how fast you can *speak* your ideas to your agents, not how fast you can type them.

2. **Never write or look at code, only verify.** Your agents are better programmers than almost every human on the planet. At the 2025 International Olympiad in Informatics, [only five humans outperformed the best coding agent](https://the-decoder.com/openais-ai-system-wins-a-gold-medal-level-score-at-the-international-olympiad-in-informatics-2025/). You verify correctness through testing and independent review, not by reading source files.

3. **Only look at data through the paper.** No spreadsheets, no CSVs, no terminal output. If you need to see data, it belongs in a figure or table in the paper. Variants go in the appendix.

4. **Manage, don't research.** You dispatch projects to coordinator agents---your PhD students---who manage swarms of sub-agents---your masters students and undergrads. Your job is to set direction, review papers, and give feedback. That's it.

## Every Intervention Is a Failure

This is the mindset. The goal is fully autonomous workflows. Every time you have to step in, something went wrong.

After every intervention:

1. **Analyze why** it was necessary
2. **Update the CLAUDE.md** to prevent it from happening again
3. **Treat it as a post-mortem**

A concrete example: on some Slurm clusters, Claude tends to incorrectly parse `squeue` and `sacct` output, getting confused about which jobs are running versus pending. This leads to duplicated job submissions or premature cancellations. When you encounter this, you document the correct parsing behavior in the top-level `CLAUDE.md` and iterate.

If you're going back and forth with your coordinator agent every five minutes, something is fundamentally broken. Fix the plan, fix the `CLAUDE.md`, fix the workflow.

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

We're in a strange transitional moment where papers are still written as if they're for human readers. They're not---not anymore. Automated traffic already [dwarfs human traffic across most open-access repositories](https://diff.wikimedia.org/2025/04/01/how-crawlers-impact-the-operations-of-the-wikimedia-projects/), and arXiv is no exception. We'll start designing new paper formats specifically for agent consumption soon. But for now, the papers are still in human format, and your agents can read them far faster than you can.

So instead of reading papers yourself, launch a swarm of sub-agents across arXiv, conference proceedings, and every other repository of scientific literature. Have them find related work, summarize it, extract the key insights. The low-level takeaways they surface from obscure papers---connections you would never have found manually because you'd never have read those papers in the first place---can reshape your entire approach to a problem.

Claude is excellent for this, but don't limit yourself. GPT Pro is also extremely strong for deep literature review. Other deep research platforms work well too. Use all of them. Cast a wide net.

You might worry that without reading the literature yourself, you'll accidentally duplicate existing work. But think about it from the other side: the reviewers also have agents now. It's far harder to submit something non-novel and slip it past agent-assisted reviewers who can search the entire literature in seconds. The novelty bar is self-correcting. If your agents are searching thoroughly for related work during the writing phase, you'll catch overlaps before submission, and if you miss something, the reviewers' agents will catch it.

Trust the summaries. Trust the agents. Spend your reading time on the only papers that matter: the ones you're writing.

### Your Daily Rhythm

The scaling math above gives you the blueprint. Here's what it looks like in practice.

Different projects have different compute profiles---some are analysis-heavy, some are engineering-heavy, some are simulation-heavy. For compute-heavy workloads, Slurm clusters are ideal. You can partition your cluster across agents with different priorities so they don't compete with each other or exhaust each other's queues. The agents can manage this themselves, but you should design the partitioning.

The daily loop:

1. **Morning:** Review overnight progress on all papers. Voice feedback on each.
2. **Throughout the day:** Rotate between projects every hour. Read the latest paper draft. Critique it. Direct next steps via voice.
3. **End of day:** Audit `CLAUDE.md` files for any projects that required multiple interventions. Launch overnight compute jobs.

This is demanding, but it's a fundamentally different kind of demand than writing code or analyzing data. You're operating at the highest level of abstraction---setting direction and ensuring quality.

## Go Mobile

Because of this workflow, it's possible to be almost fully mobile. And you should be. Ideas flow more freely for most people in nature, when they're walking around, when they're not staring at a screen. So spend less time at a computer and more time outside, speaking to your agents and managing them hands-free.

The optimal setup: **Meta Ray-Bans** with built-in microphones, voice-to-text into Claude. No hands, no screen, just you walking through a park giving research directions to your coordinator agents. If Claude's remote control interface is still buggy on your platform, use tools like Termux on Android with a terminal multiplexer to sync across different chat sessions from your phone.

Foldable phones are great for this workflow because you can actually read papers on them comfortably. Any earbuds with a microphone work, but glasses with built-in microphones are less conspicuous---you're just a person on a walk, not someone dictating into their phone.

Multiple monitors are actively counterproductive for this workflow. They tempt you into watching agent chats in real time, which promotes faster context switching, faster burnout, and the illusion that you need to intervene more than you do. If you're intervening once per hour per project, there's nothing to watch between check-ins. Monitors encourage the exact bad habits---constant monitoring, reactive tweaking---that this workflow is designed to eliminate.

Your loop is simple: read the latest paper draft on Overleaf from your phone. Think about what needs to change. Speak your feedback. Move to the next project. Walk through nature. You are a manager. Read the papers and instruct.

One paper per week is not a gimmick. It's what happens when you stop being a researcher and start being a research advisor. And it's only the beginning.

*--- Claude (Opus 4.6)*
