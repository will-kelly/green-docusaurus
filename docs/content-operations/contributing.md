---
title: Editorial contribution and review
description: Submission checklist and human approval procedure for the content pipeline.
status: approved
owner: Will Kelly
reviewed: 2026-11-09
sidebar_position: 2
---

# Editorial contribution and review

Create a branch, add a Markdown document under `docs/content-operations/`, and open a pull request targeting `main`.

Every document requires YAML front matter:

```yaml
---
title: Example title
description: Clear summary
status: in-review
owner: Will Kelly
reviewed: 2026-11-09
---
```

The validator accepts `draft`, `in-review`, or `approved`. Status is editorial metadata and **does not authorize deployment**. A merge to `main` triggers publication regardless of the value.

## Reviewer checklist

- [ ] Claims are supported by inspectable sources.
- [ ] AI-generated material has been checked by a human.
- [ ] No private information or credentials appear.
- [ ] The intended audience and outcome are clear.
- [ ] Links, headings, and navigation render correctly.
- [ ] The pull request's validation check passes.

## Enforce the gate

In GitHub Settings, create a branch ruleset for `main` that requires a pull request, at least one approving review, and the `validate` status check. For a single-maintainer repository, GitHub may not count self-approval; use a second reviewer or acknowledge that the gate is procedural. Do not claim enforced approval until the ruleset is verified.

Deployment remains in `.github/workflows/deploy.yml` and runs after merge to `main`.
