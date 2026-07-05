---
title: 'Replacing a Manual Process with a Workflow Automation Layer'
description: 'LLM, data, and integration work focused on one slow manual business process — built API-first, on infrastructure the client owns.'
sector: 'AI enablement'
family: 'Build'
published: '2026-07-05'
results:
  - { value: '1 workflow', label: 'scoped end to end' }
  - { value: 'API', label: 'first approach' }
  - { value: 'owned', label: 'client infrastructure' }
draft: false
---

*Anonymized engagement summary. Client-identifying details are withheld, and the figures shown describe how the engagement was structured — not client efficiency outcomes, which remain confidential.*

## The situation

A services business ran a critical internal process the way most companies still do: a person reading incoming documents, extracting what mattered, re-keying it into other systems, and flagging exceptions by email. The process worked — which is exactly why it had never been fixed — but it consumed skilled staff hours daily and scaled linearly with volume.

## The approach

We applied the one-workflow rule: scope a single process end to end rather than "exploring AI opportunities" broadly. Discovery mapped the real workflow — including the undocumented judgment calls the team made without noticing — before any architecture was drawn.

The build itself was an integration project with a model in the middle: document intake, LLM-based extraction with confidence thresholds, validation against existing systems of record, and a human review queue for anything below threshold. The people who ran the manual process reviewed and corrected outputs from the first week, which both built trust and produced the evaluation data the system was tuned against.

## The architecture stance

- **API-first** — every capability exposed as an endpoint, so the client's own team can extend it without us.
- **Client-owned infrastructure** — deployed in the client's cloud accounts, under their access controls, from day one.
- **Human escalation path** — low-confidence cases route to people by design; the goal is redirected hours, not a headless process.

## What the client owns

Source, documentation, prompts, evaluation datasets, and the infrastructure itself. Nothing about the system requires Markosh to operate it — which we consider a feature of the engagement, not a threat to it.
