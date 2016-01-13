---
title: Components
menuOrder: 5
---

Here are some of the components that make up the build system.

## Scripts

## Styles

### Bootstrap

The styles for the website are based on [Bootstrap](http://getbootstrap.com/) (at this stage Bootstrap version 3). You can use any of the [CSS classes](http://getbootstrap.com/css) or [Components](http://getbootstrap.com/components) available in Bootstrap, like grids, buttons, and navbars.

*Note that the [production version](/build-system/environment#process-env-env) of the site strips out unused CSS classes. This means that if you try to add classes on the fly (e.g. through Chrome Developer Tools) the class may not be present in the CSS file, unless it is already in use somewhere on the site. [Development builds](/build-system/environment#process-env-env) include all Bootstrap classes.*

#### Bootstrap Javascript Components

You can use [Bootstrap Javascript Components](http://getbootstrap.com/javascript). However, it may be necessary to add them to the `src/scripts/app.bundle.js` bundle, and import any corresponding CSS in `styles/partials/vendor/_bootstrap.scss`

### Font Awesome Icons

The site uses the Font Awesome icon set. You can add icons using the Font Awesome syntax: `<i class="fa fa-twitter"></i>`

For example...

```html
<a href="https://twitter.com/GivingWhatWeCan" class="btn btn-primary">
	Follow us on Twitter <i class="fa fa-twitter"></i>
</a>
```

Becomes...

<a href="https://twitter.com/GivingWhatWeCan" class="btn btn-primary">
	Follow us on Twitter <i class="fa fa-twitter"></i>
</a>

You can search for icons on the [Font Awesome website](http://fontawesome.io/icons/) (there are 600+ to choose from!).

#### metalsmith-icons / Fontello

Because the native Font Awesome icon files are very large, the build system uses *[metalsmith-icons](https://www.npmjs.com/package/metalsmith-icons)* to create files that only contain icons that are actually used on the website. *metalsmith-icons* uses the [Fontello](https://github.com/fontello/fontello#developers-api) API to do the processing. This also means that we can add custom icons (see below).

This introduces a couple of quirks. 

Firstly, all icons are remapped to the `icon` namespace instead of the `fa` namespace. I.e. the tag to describe an icon goes from `<i class="fa fa-twitter"></i>` to `<i class="icon icon-twitter"></i>`. In general this isn't an issue, because *metalsmith-icons* will update the HTML automatically, however it's something to be aware of. Custom icons (i.e. ones that are not in the Font Awesome set) will always use the `icon` namespace, so you will have to refer to them in the HTML accordingly, e.g. `<i class="icon icon-custom"></i>`.

Secondly, for some bizarre reason the Fontello icon names are not always the same as the Font Awesome names. *metalsmith-icons* will try to make any necessary substitutions, but at this stage not all icons have been remapped. See the [section on Substitutions](https://www.npmjs.com/package/metalsmith-icons#substitutions-object) in the *metalsmith-icons* documentation for more info. 


#### Custom Icons

An additional benefit of using Fontello is the ability to add custom icons. Fontello allows you to upload SVG files, which it will process into a JSON description of the icon file. When *metalsmith-icons* is processing the icon files from Font Awesome, it will also process any custom icons defined in `src/fonts/glyphs.json`. The process is a little cumbersome, but hopefully you shouldn't need to do it that often:

- Find or create an SVG file of your custom icon
- Go to the main [Fontello page](http://fontello.com/)
- Drag the SVG onto the browser window. A monochrome version of the icon should appear under the 'Custom Icons' header.
- If you hover over it, you can click on the pencil icon to edit the name that will be used in its CSS class (you can also edit this info from the 'customise names' tab)
- Click on the icon to select it for inclusion in the download (it should have a red circle around it)
- Click the big red 'download webfont' button
- Open the `.zip` file that downloads, browse to the extracted directory (`fontello-abc123...`) and open `config.json` in your text editor
- Copy any Objects nested as an Array under the `glyphs` key (just the Objects, not the square Array braces) — these represent your custom icons
- Paste the Objects into the Array in `src/fonts/glyphs.json`. Ensure you add commas between each Object as necessary


