---
title: Build System
menuOrder: 2
---

This section describes the technical details of how the site works.

## Overview

The Giving What We Can website is a _static_ website. That means that the live website is just a collection of HTML files (plus static assets like Javascript, CSS, images, PDFs etc).

The site is built from templates by a static site generator called Metalsmith. Metalsmith converts Markdown into HTML, adds useful markup to the HTML, compiles the HTML using Swig templates, processes static assets like CSS and Javascript, and spits out a self-contained directory of HTML files, which comprises the Giving What We Can website.

Content is hosted and edited on Contentful. Contentful makes it easy to create different kinds of entries (e.g. pages, posts, authors). Metalsmith pulls in Markdown and metadata from Contentful. This data is then used to build the HTML files. So, if a new 'Post' is added on Contentful, next time the site is rebuilt, the blog should display a new post.

The site is hosted on Netlify. Netlify gets notified any time there is a new `commit` to the GitHub repo (or is manually triggered), runs the build script, then serves the resulting directory of static files.

For more information, read the [Rationale](/build-system/rationale) page.

### The build pipeline

The site build system works roughly as follows

- Text content and images are hosted in [Contentful](https://app.contentful.com)
- The build system and static assets are hosted in the [GitHub repository](github.com/centre-for-effective-altruism/givingwhatwecan-org-static)
- When a build is triggered, Metalsmith:
	1. Consumes Markdown and metadata from Contentful, which constitutes all the pages, posts, authors etc.
	2. Uses the metadata to build the file/folder structure for the website
	3. Parses the Markdown into HTML
	4. Makes amendments to the HTML markup (e.g. wrapping images in `<figure>` tags)
	5. Inserts snippets (called 'specials') into the HTML codes (e.g. a Table of Contents, responsive video embed, a content block etc)
	5. Inserts the HTML into the site layout, using Swig templates
	6. Compiles Javascript into a single file using Browserify
	7. Compiles CSS files using SASS
	5. If the build is running in `production` mode (as it would be on Netlify), minifies HTML, CSS, and JS files, removes unused CSS style definitions etc
	6. Spits out a folder (`/dest`) of static files comprising the site, which can be served from any web server.
- If the build is running on Netlify, Netlify serves the `/dest` directory, pushing files out to its CDN edge nodes


## The components in detail

### Contentful

### Metalsmith

### Netlify