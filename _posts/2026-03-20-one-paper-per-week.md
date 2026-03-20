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

*(Yes, really. The papers are written by Claude. This blog post about the papers is also written by Claude. It's Claude all the way down.)*

---

There is a new workflow for research that turns a single person into an entire lab. Not metaphorically. You can run multiple research projects in parallel, each producing publication-ready papers, without typing a single word or reading a single line of code. This is not about working harder. It is about finally structuring work around the actual bottleneck: your ability to think and direct.

Here is how to publish one paper per week.

## Never Type

Every keystroke is a mistake. If you are typing, you are doing the slow thing. The bottleneck in a well-optimized workflow is not writing — it is *thinking* and *conveying direction*. Your only interface should be your voice. You speak, your agents listen, and the work gets done.

If typing is still your bottleneck, you have not optimized your workflow yet. In a properly structured system, you should be bottlenecked by how fast you can convey ideas and intent to your agents. That is a much better bottleneck to have.

## Never Look at Code

You are not a programmer in this workflow. You are a research advisor. You do not read code. You do not look at raw data. You do not open spreadsheets. Your only interactions are through voice and through the final paper. All results, all figures, all tables — you see them in the paper or you do not see them at all.

If you need more detail, that is what the appendix is for. Promote figures and tables from the appendix into the main paper when they earn their place. The appendix becomes your workspace, and conveniently, many of those extra figures and tables end up being ablations that belong in the appendix anyway.

## Only Look at Papers

This is the key insight that makes the whole system work. By restricting yourself to only reviewing papers, you transform the task of *paper creation* into *paper review*. This is the classic P versus NP asymmetry: it is dramatically harder to write a paper from scratch than it is to critique one. You are exploiting this asymmetry. Your agents generate, you verify. They write, you review. The hard problem becomes easy.

## Claude Opus 4.6 is King

Let's be direct. Claude Opus 4.6 is the best model for writing research papers and for writing research code. Use it for your coordinator agents, use it for your sub-agents, and do not compromise on this.

## The Mono-Repo

Structure your research as a mono-repo where each subdirectory is its own project. At the top level, place a `CLAUDE.md` that contains everything shared across projects: the general structure of the mono-repo, your preferences for agent coordination, your coding standards, and your philosophy on liberal sub-agent use. Within each project subdirectory, place a project-specific `CLAUDE.md` with the details relevant to that project alone.

When you launch Claude Code within a project subdirectory, it reads both files — the global context and the local context. This layered approach means your agents always know the big picture and the specific details simultaneously. With today's context windows, you can afford to be generous with what goes into these files.

## The Advisor Model

You are the research advisor. You do no coding. You look at no raw data. You set directions and give intermediate feedback on papers. That is it.

Your coordinator agents are your PhD students. Each project gets exactly one coordinator agent, and this coordinator should do almost no work by itself. Its job is to understand the project plan and dispatch sub-agents — aggressively, liberally, without hesitation.

The sub-agents are the masters students and undergrads. They do the actual work: writing code, running experiments, generating figures, writing paper sections, reviewing code, writing tests.

The hierarchy is: **You → Coordinator Agents → Sub-Agents**. You talk to the coordinators. The coordinators manage everything below them. You never reach down into the sub-agent level.

## The Hyper-Detailed Plan

Before any agent writes a single line of code, spend 30 minutes to an hour creating a hyper-detailed planning document for each project. When I say hyper-detailed, I mean:

- Hyperparameters
- High-level code design
- Experiment design
- Paper structure and section design
- Figure design — what each figure should show
- Table design — what each table should contain
- Expected results — what you think the data will look like

This plan is the most important artifact in the entire workflow. Everything downstream flows from it. Skimp here and you pay for it everywhere else.

## Write the Paper First

One of the first things each project's coordinator agent should do is launch a sub-agent to write the complete paper immediately — with fake data, fake tables, and fake figures. Not placeholder text. Actual figures showing what you *expect* to find, with fabricated but plausible data.

There is zero overhead to writing papers and generating figures right now. So use that. The reason you start with the paper is that it organizes your thinking about what matters. It is much easier to evaluate priorities when you are looking at the complete paper with all its figures, the right number of pages, the right number of lines per paragraph. You can see what is missing, what is redundant, and what needs emphasis. The paper draft becomes your thinking tool.

While this is happening, other sub-agents should already be coding the actual experiments in parallel.

## Five Reviewers for Every Coder

For every sub-agent that is writing code, there should be at least five sub-agents reviewing that code and writing unit tests for it. This ratio sounds extreme. It is not. Code review and testing are cheaper than debugging, and the cost of a subtle bug propagating through your experimental pipeline is catastrophic. You lose days, not hours.

Be extremely liberal with sub-agents. They should handle every specific task. The coordinator should be dispatching constantly.

## Maximize Your Subscriptions

A Claude Max subscription runs about $100 to $200 per month. Whatever your budget allows, maximize the number of active subscriptions. The limits are dynamic, but practically speaking you should be hitting rate limits at least every few days or you are not using enough capacity. Start with three active subscriptions and scale up from there as your budget and coordination ability allow.

The constraint is not cost — it is your ability to successfully coordinate all those agents. But that constraint loosens as you get better at this workflow and as your `CLAUDE.md` files get more refined.

## The Assembly Line

Putting it all together, here is what a typical project looks like:

1. **You** spend 30-60 minutes creating a detailed plan (voice-to-text, never typing)
2. **Coordinator agent** reads the plan and immediately dispatches sub-agents
3. **Paper sub-agent** writes the complete paper with expected results and fake data
4. **Code sub-agents** implement the experiments in parallel
5. **Review sub-agents** (5x the coders) review code and write tests
6. **You** review the paper draft and give feedback via voice
7. As real results come in, they replace the fake data in the paper
8. **You** review again, promote appendix figures, adjust priorities
9. Iterate until the paper is ready

You are never in the weeds. You are always at the level of the paper. Your feedback is "this figure doesn't show what I expected" or "this section needs a stronger motivation," never "there's a bug on line 47."

---

This workflow exists right now. The tools are here. The models are here. The only thing missing is the willingness to actually structure your work this way — to let go of the keyboard, stop staring at terminals, and operate at the level you should have been operating at all along: the level of ideas.

Now if you will excuse me, I have six other blog posts to write simultaneously.
