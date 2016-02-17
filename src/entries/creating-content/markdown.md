---
title: Markdown
menuOrder: 2
---
## Using Markdown

Content for the Giving What We Can site is written in Markdown, which is a simple way to use symbols to format a plain-text document. It means that you can write content in any text editor.

### Images

You should import all images into the Contentful Media library (instructions [here](/creating-content/contentful)). You can then insert these using the `Insert Media` button at the top of the `Body` field of any entry in Contentful.

```
![Image alt text](//images.contentful.com/abc123/987xyz/image.jpg)
```

#### Image Captions

To add a caption to an image, don't leave a space between the image tag and the next line of text:

```
![Image alt text](//images.contentful.com/abc123/987xyz/image.jpg)
Figure 1: This text will be added to the 

This is the next paragraph.
```

### HTML

You can use valid HTML in Contentful. This is useful if you wish to add `class` or other attributes to your HTML tags, complex tables etc. In most cases it's possible to achieve what you want to do without resorting to adding HTML code, so prefer a Markdown-only solution.

### Footnotes

If you want to add footnotes to the Markdown, use the [Pandoc footnote syntax](http://pandoc.org/README.html#footnotes):

**Markdown:**

```markdown
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

        { some.code }

    The whole paragraph can be indented, or just the first
    line.  In this way, multi-paragraph footnotes work like
    multi-paragraph list items.

This paragraph won't be part of the note, because it
isn't indented.
```

You can also add *inline footnotes*, which are easier to write (because you don't have to go to the bottom of the page to add a corresponding reference) but cannot be reused:

```markdown
Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]
```

*The site uses [markdown-it-footnote](https://www.npmjs.com/package/markdown-it-footnote) to parse footnotes — the example above was borrowed from the markdown-it-footnote docs.*

## Converting to Markdown

If your content is not in Markdown format, you'll need to convert it.

### Google Docs

The most common scenario is that the content is written as a Google Doc. Fortunately, we've built a converter, currently available at [https://colophonemes.github.io/sanitise-google-doc/](https://colophonemes.github.io/sanitise-google-doc/).

You will need to be signed into a Google account that has access to the document you're trying to convert.

- Make sure the 'Markdown' checkbox is selected
- Click on the 'Open Google Doc' button. You may need to search for the title of your document
- Select the document from the list
- The Markdown should appear at the bottom of the page. Copy and paste it into Contentful

#### Making the most of the converter

##### Footnotes

If your document cites sources, you should use regular footnotes in your Google Docs (*Insert > Footnote*). You should avoid inline citiations, or adding footnotes to the Google Doc manually. The Converter will automatically convert the footnotes into the right format.

If you need to add extra footnotes in after you've converted the document, see the [Footnotes section](#footnotes) above.


#### Images in your Google Doc

Any images that you want to add to the content should be added using the [normal Contentful image upload](/creating-content/contentful#uploading-images-and-other-assets). If possible, you should avoid adding images to the Google Doc, and just add the images when you create the page/post on Contentful (either as the page/post featured image, or inline).

Sometimes the document you want to convert will already have inline images. When you convert it, the Markdown will contain links to these images, hosted on Google's servers. You should get rid of these links, and replace them with links to a version of the image hosted on Contentful. It's tempting to skip this step (because, when you preview the page, everything looks fine), but you shouldn't — images hosted on Google will not benefit from the image optimisations that happen to those hosted on Contentful, which will slow the page down significantly for people accessing your content on a mobile device.

**Easily download all images from a Google Doc **

- In the Google Doc, select the _File -> Download As -> Web Page (HTML, zipped)_
- Unzip the `.zip` file that downloads
- In Contentful, go to the Media Library, click _Add New Asset -> Multiple Assets_. A file picker dialogue wil appear
- Drag and drop the files from the `.zip` file that you downloaded from Google, or click _Choose Files_ and browse to the folder. Use `Shift+Click` to select all the images
- Several new images should appear in the Contentful Media Library, currently marked as _Draft_. Edit each of these images with a descriptive title, and _Publish_ them.
- In the Contentful Entry, replace any references to the Google-hosted version of the image (e.g. replace links that look like `![](xx.googleusercontent.com/abc123_xyz789.jpg)` with the [corresponding image from the Contentful Media Library](#images))


