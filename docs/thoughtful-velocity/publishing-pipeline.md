---
title: Publishing pipeline
sidebar_position: 2
description: How Thoughtful Velocity content moves from draft to reviewed, validated, published Docusaurus pages.
---

# Publishing pipeline

Thoughtful Velocity uses the repository itself as the source of truth. Docusaurus handles presentation and GitHub Actions handles checks and deployment.

## Editorial contract

1. **Write:** Create a Markdown article in `blog/` with filename `YYYY-MM-DD-thoughtful-velocity-<slug>.md`. Use the template below.
2. **Substantiate:** Separate observations, opinions, and verifiable claims. Add credible sources for consequential external claims. Do not invent statistics, quotations, implementations, or customer results.
3. **Review:** Work on a branch and open a pull request. A human checks accuracy, positioning, originality, voice, and links. Do not auto-merge generated articles.
4. **Validate:** GitHub Actions runs the content checker and the Docusaurus production build on the pull request.
5. **Publish:** Merge an approved PR into `main`. The existing `Publish Docusaurus` workflow builds the site and deploys to GitHub Pages.
6. **Verify:** Check the GitHub Actions deployment result and the public URL. A successful commit or PR is **not** proof of a live published page.

## Article template

```md
---
title: A specific argument, not a generic AI headline
description: A concise, useful description of the article.
slug: thoughtful-velocity-specific-argument
authors: []
tags: [thoughtful-velocity, content-operations]
---

# A specific argument, not a generic AI headline

A clear thesis and an example grounded in observed practice.

## The operational constraint

Describe who owns the work, where it waits, and what breaks.

## What changes

Present a concrete process, accountable owner, and measurable check.

## What remains uncertain

Call out facts still requiring verification.

## Next step

End with a specific action or question appropriate to the argument.
```

**Author note:** The `authors: []` example is deliberately neutral. Replace it with a configured author ID before publication if a byline is desired; otherwise omit the field. The first article uses `authors: []` only if tested to be compatible, so the initial checked-in article omits it.

## Content requirements

The repository checker requires a title, description, slug, and the `thoughtful-velocity` tag for each Thoughtful Velocity post. It rejects obvious placeholders and duplicate slugs. It does **not** verify claim accuracy, source quality, authorial voice, or whether deployment succeeded. Those require review.

## Operational scope

This first version deliberately has no AI API calls, secrets, scheduling, CMS, or publishing bot. Generate and revise content with your existing writing workflow, then submit it through a PR. Automation can be added once real end-to-end editorial and publication evidence exists.

## Rollback

If a published article is wrong, revert the merge commit or submit a correcting PR. Verify the resulting Pages deployment and the public article afterward.
