---
title: Template Tags
menuOrder: 5
---

There are a number of template tags that you can use to 

## Tags

### Table of Contents

Add a Table of Contents to a page. 

```
{% include specials.toc %}
```

This is generated from the heading tags (e.g. `<h2>`,`<h3>` etc). You should always start your headings at Heading 2 (`<h2>` or `##` in Markdown). Headings will nest under each other (so, a Heading 3 nests under Heading 2).

By default, the TOC will go 3 levels deep (i.e. Heading 2, Heading 3, Heading 4), but if you want to set a specific level, you can use the `tocDepth` tag:

```
{% set tocDepth=5 %}
{% include specials.toc %}}
```
