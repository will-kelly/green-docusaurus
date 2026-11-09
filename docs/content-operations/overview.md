---
title: AI content operations pipeline
description: A reproducible GitHub-first editorial workflow with human publication approval.
status: approved
owner: Will Kelly
reviewed: 2026-11-09
sidebar_position: 1
---

# AI content operations pipeline

This is a small, working docs-as-code publishing system. Content is submitted as Markdown, validated by GitHub Actions, reviewed by a human, and deployed to GitHub Pages only after merge to `main`.

## Editorial stages

1. **Intake:** Open a branch and create a document using the metadata template.
2. **Draft:** Record claims and evidence. AI assistance is optional and never an approval.
3. **Validation:** Open a pull request. CI checks metadata and builds the Docusaurus site.
4. **Human review:** A reviewer checks claims, originality, audience, and editorial quality.
5. **Approval:** An authorized maintainer merges the pull request only after review.
6. **Deployment:** The existing `Publish Docusaurus` workflow builds and deploys `main`.

## Limitations

The metadata validator verifies presence and format, not factual accuracy. GitHub branch protection or a ruleset requiring an approving review and the `validate` status check must be configured in repository settings to **enforce** human approval. Without that setting, the review gate is a documented process, not a technical guarantee.

See [the contributor guide](./contributing.md) and [example article](./example.md).
