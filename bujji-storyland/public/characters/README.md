# Your character artwork goes here

Drop your official Bujji Storyland character renders in this folder, for example:

- `bujji.png`
- `chinni.png`
- `baby-bird.png`
- `mother-bird.png`

Use transparent PNG or WebP, roughly 800–1200 px tall.

Then open `src/data/characters.js` and set the `image` field for each character:

```js
image: '/characters/bujji.png',
```

Every place on the site that shows that character (hero, cards, popups, story scenes, subscribe section)
will switch from the built-in SVG drawing to your artwork automatically.
