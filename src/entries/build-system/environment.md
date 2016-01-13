---
title: Environment Variables
menuOrder: 3
---

The Build environment is controlled by a number of Node Environment Variables.

## Setting Environment Variables

### .env file

When developing, environment variables should be stored in a `.env` file created at the project root. This is loaded using the dotenv plugin. A sample `.env` file might look like this:

```

ENV=development
CONTENTFUL_ACCESS_TOKEN=aaaaaaaaaabbbbbbbbbbbccccccccc11111122222223333333
CONTENTFUL_PREVIEW_ACCESS_TOKEN=aaaaaaaaaabbbbbbbbbbbccccccccc11111122222223333333
CONTENTFUL_SPACE=aaabbbccc111222
NETLIFY_WEBHOOK=https://api.netlify.com/build_hooks/1234567890

```
To get real values for these, check with the site admin.

<div class="alert-danger">`.env` should always be ignored by your `.gitignore` file and never be checked into source control/GitHub</div>


## Variables

### process.env.ENV

Can be `production` or `development`.

In `development` mode, the site does not optimise static files, and prints more verbose output to the console.

`production` mode turns on all file optimisations, including
- Minification of HTML, CSS, and Javascript files
- Creation of Source Maps for minified CSS and JS
- Stripping of unused CSS classes (this can take several minutes)

Needless to say, `production` takes a lot longer to build than `development`
