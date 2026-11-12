---
title: Example editorial workflow
description: A sample document that demonstrates content metadata and a reviewable change.
status: draft
owner: Will Kelly
reviewed: 2026-11-09
sidebar_position: 3
---

# Example editorial workflow

**Problem:** Publishing AI-assisted content without evidence checks creates avoidable editorial risk.

**Proposed process:** A writer submits a Markdown draft in a pull request. Automated checks catch missing metadata and broken builds. A human reviewer assesses the actual claims before merging.

**Acceptance test:** Remove the `owner` field in a test branch and run `node scripts/validate-content.mjs`. The validator must fail. Restore the field, run the validator and `npm run build`, and confirm both pass.

**Known limitation:** This sample is a demonstration, not evidence that a production editorial team has adopted the workflow.
