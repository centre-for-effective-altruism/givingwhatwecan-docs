---
title: Rationale
menuOrder: 3
---

**Why did we choose the particular build system we did?**

## Speed

Database calls and page rendering slow down page load times. It's possible to cache pages, but there is still an overhead for checking the cache and then rendering if there's nothing there . By pre-compiling the static site, every page is ready to serve immediately.

In addition, by using Netlify, we can host not only the static files (e.g. Javascript and CSS), but the HTML files themselves on the CDN edge nodes, for even greater speeds. We can also take advantage of Contentful's images API, which means that it's possible to dynamically serve visitors the optimal image size for their browser.

## Security

Self-hosted content management systems like Wordpress and Drupal require significant maintenance to keep secure, and are routinely targeted for security vulnerabilities. Updating the core systems regularly is important, but then there are risks of functionality breaking. It's possible to use managed solutions, but then you lose the flexibility of being able to control theme output etc. 

A static site gets around this, by being basically un-hackable. There is no active code running on our server, so there's nowhere for a potential attacker to get in.

## Loose coupling

The various parts of the system — Contentful, the [Metalsmith build system](/build-system), and the Netlify hosting — are all relatively independent of each other. This means that switching costs are lower, and we maintain our ability to pivot to something better.

For example, if we decided that we didn't want to use Netlify as a host, or we wanted to change our build system (e.g. to use a different static generator like Jekyll, Brunch, or Broccoli, or to move to a single-page app that consumed the Contentful data dynamically) we're not faced with rebuilding every part of the system — we can just swap one component out. Because all Contentful data is in Markdown, it's easy to extract it into a common format (e.g. Markdown files with YAML front-matter), and re-use it.

## User- and developer- friendliness

Contentful has a great user interface, and makes it easy for non-expert users to write in Markdown.

It's also really easy to create complex, abstract, and related content types. For example, it was easy to create a 'Menu' content type, which collected together a group of 'Pages' and 'Links' into the navigation menu seen at the top of every page on the website.

## Maintenance

As much as possible, we've tried to move away from maintaining our own server infrastructure. By using Netlify and Contentful, we aren't spending staff time doing things like keeping a server running at all times, patching security vulnerabilities, 

Netlify's build system also means that hosting concerns, like deploying assets to the CDN and invalidating caches is all handled automatically.